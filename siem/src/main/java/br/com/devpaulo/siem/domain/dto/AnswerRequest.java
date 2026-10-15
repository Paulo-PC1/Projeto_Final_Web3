package br.com.devpaulo.siem.domain.dto;

import jakarta.validation.constraints.NotNull;

/**
 * Corpo do POST /user_Answer. O aluno informa APENAS o exercício e o valor
 * respondido. Quem responde (usuário do token) e se a resposta está correta
 * são decididos pelo servidor, para o cliente não poder forjar nenhum dos dois.
 */
public record AnswerRequest(
		@NotNull Long exerciseId,
		@NotNull Double answer) {
}
