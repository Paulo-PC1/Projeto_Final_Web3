package br.com.devpaulo.siem.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.devpaulo.siem.domain.dto.AnswerRequest;
import br.com.devpaulo.siem.domain.dto.AnswerResponse;
import br.com.devpaulo.siem.domain.model.Exercise;
import br.com.devpaulo.siem.domain.model.User;
import br.com.devpaulo.siem.domain.model.UserAnswer;
import br.com.devpaulo.siem.repository.ExerciseRepository;
import br.com.devpaulo.siem.repository.UserAnswerRepository;
import br.com.devpaulo.siem.repository.UserRepository;
import br.com.devpaulo.siem.service.exception.NonExistentOrInactiveException;

@Service
public class UserAnswerService {

	@Autowired
	public UserAnswerRepository userAnswerRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ExerciseRepository exerciseRepository;
	
	/**
	 * Registra a resposta do aluno logado. O usuário vem do token (e-mail = subject
	 * do JWT) e a correção é feita aqui, comparando com o gabarito do exercício.
	 */
	public AnswerResponse register(String email, AnswerRequest request) {
		User user = userRepository.findByEmail(email)
				.filter(u -> Boolean.TRUE.equals(u.getActive()))
				.orElseThrow(NonExistentOrInactiveException::new);

		// Exercício inexistente ou desativado => tratado como "não encontrado" (400)
		Exercise exercise = exerciseRepository.findById(request.exerciseId())
				.filter(e -> Boolean.TRUE.equals(e.getActive()))
				.orElseThrow(() -> new EmptyResultDataAccessException(1));

		UserAnswer answer = new UserAnswer();
		answer.setUserId(user);
		answer.setExerciseId(exercise);
		answer.setUserAnswer(request.answer());
		answer.setCorrect(isCorrect(request.answer(), exercise.getCorrectAnswer()));
		return AnswerResponse.from(userAnswerRepository.save(answer));
	}

	public List<AnswerResponse> findByUserEmail(String email) {
		return userAnswerRepository.findByUserEmail(email).stream().map(AnswerResponse::from).toList();
	}

	// O banco guarda DECIMAL(10,2): compara em centésimos para evitar erro de ponto flutuante
	private boolean isCorrect(Double given, Double expected) {
		return Math.round(given * 100) == Math.round(expected * 100);
	}
	
	public UserAnswer update(Long id, UserAnswer userAnswer) {
		UserAnswer userAnswerSaved = findUserById(id);
		BeanUtils.copyProperties(userAnswer, userAnswerSaved, "id");
		return userAnswerRepository.save(userAnswerSaved);
	}
	
	public UserAnswer findUserById(Long id) {
		UserAnswer userAnswerSaved = userAnswerRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return userAnswerSaved;
	}
}
