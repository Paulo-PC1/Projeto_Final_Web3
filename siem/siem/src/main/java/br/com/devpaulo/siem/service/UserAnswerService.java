package br.com.devpaulo.siem.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.devpaulo.siem.domain.model.UserAnswer;
import br.com.devpaulo.siem.repository.UserAnswerRepository;

@Service
public class UserAnswerService {

	@Autowired
	public UserAnswerRepository userAnswerRepository;
	
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
