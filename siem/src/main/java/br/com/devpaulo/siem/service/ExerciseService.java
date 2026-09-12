package br.com.devpaulo.siem.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.devpaulo.siem.domain.model.Exercise;
import br.com.devpaulo.siem.repository.ExerciseRepository;

@Service
public class ExerciseService {

	@Autowired
	public ExerciseRepository exerciseRepository;

	public Exercise update(Long id, Exercise exercise) {
		Exercise exerciseSaved = findUserById(id);
		BeanUtils.copyProperties(exercise, exerciseSaved, "id");
		return exerciseRepository.save(exerciseSaved);
	}

	public void updateActiveProperty(Long id, Boolean active) {
		Exercise userSaved = findUserById(id);
		userSaved.setActive(active);
		exerciseRepository.save(userSaved);
	}

	public Exercise findUserById(Long id) {
		Exercise exerciseSaved = exerciseRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return exerciseSaved;
	}
	
}
