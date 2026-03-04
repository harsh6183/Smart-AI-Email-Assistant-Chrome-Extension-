package com.email.writer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {

  private final WebClient webClient;
  private final String apiKey;

  public EmailGeneratorService(WebClient.Builder webClientBuilder,
      @Value("${gemini.api.url}") String baseUrl,
      @Value("${gemini.api.key}") String geminiApiKey) {

    this.apiKey = geminiApiKey;
    this.webClient = webClientBuilder.baseUrl(baseUrl).build();
  }

  public String generateEmailReply(EmailRequest emailRequest) {

    String prompt = buildPrompt(emailRequest);

    String requestBody = String.format("""
        {
          "contents": [
            {
              "parts": [
                {
                  "text": "%s"
                }
              ]
            }
          ]
        }
        """, prompt);

    String response = webClient.post()
        .uri("/v1beta/models/gemini-3-flash-preview:generateContent")
        .header("x-goog-api-key", apiKey)
        .header("Content-Type", "application/json")
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(String.class)
        .block();

    return extractResponseContent(response);
  }

  private String extractResponseContent(String response) {
    try {
      ObjectMapper mapper = new ObjectMapper();
      JsonNode root = mapper.readTree(response);

      return root.path("candidates")
          .get(0)
          .path("content")
          .path("parts")
          .get(0)
          .path("text")
          .asText();

    } catch (Exception e) {
      throw new RuntimeException("Failed to parse Gemini response", e);
    }
  }

  private String buildPrompt(EmailRequest emailRequest) {
    StringBuilder prompt = new StringBuilder();

    prompt.append("Generate a professional email reply.\n");

    if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
      prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.\n");
    }

    prompt.append("Original Email:\n");
    prompt.append(emailRequest.getEmailContent());

    return prompt.toString();
  }
}