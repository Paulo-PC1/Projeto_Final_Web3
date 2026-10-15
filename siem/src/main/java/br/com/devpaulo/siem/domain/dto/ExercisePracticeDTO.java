package br.com.devpaulo.siem.domain.dto;

import br.com.devpaulo.siem.domain.model.Exercise;

/**
 * Visão do exercício para quem vai RESOLVER: igual à entidade, mas sem o
 * campo correctAnswer (senão o gabarito iria junto no JSON da tela do aluno).
 */
public record ExercisePracticeDTO(
		Long id,
		String statement,
		String operation,
		Long categoryId,
		String categoryName) {

	public static ExercisePracticeDTO from(Exercise e) {
		return new ExercisePracticeDTO(
				e.getId(),
				e.getStatement(),
				e.getOperation(),
				e.getCategoryId().getId(),
				e.getCategoryId().getCategoryName());
	}
}
