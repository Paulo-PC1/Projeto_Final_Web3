package br.com.devpaulo.siem.domain.dto;

import br.com.devpaulo.siem.domain.model.UserAnswer;

/**
 * Resposta devolvida ao aluno. Não carrega o objeto User (evita expor dados
 * pessoais). A resposta certa só é revelada depois de o aluno ter tentado.
 */
public record AnswerResponse(
		Long id,
		Long exerciseId,
		Double userAnswer,
		Boolean correct,
		Double correctAnswer) {

	public static AnswerResponse from(UserAnswer a) {
		return new AnswerResponse(
				a.getId(),
				a.getExerciseId().getId(),
				a.getUserAnswer(),
				a.getCorrect(),
				a.getExerciseId().getCorrectAnswer());
	}
}
