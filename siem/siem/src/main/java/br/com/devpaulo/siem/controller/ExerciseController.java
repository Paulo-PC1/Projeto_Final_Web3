package br.com.devpaulo.siem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.devpaulo.siem.domain.model.Exercise;
import br.com.devpaulo.siem.repository.ExerciseRepository;
import br.com.devpaulo.siem.service.ExerciseService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

	@Autowired
	private ExerciseRepository exerciseRepository;
	
	@Autowired
	private ExerciseService exerciseService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_EXERCISE')")
	public List<Exercise> findAll(){
		return exerciseRepository.findAll();
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_EXERCISE')")
	public ResponseEntity<Exercise> findById(@PathVariable Long id){
		Optional<Exercise> exercise = exerciseRepository.findById(id);
		if(exercise.isPresent()) {
			return ResponseEntity.ok(exercise.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_REGISTER_EXERCISE')")
	@ResponseStatus(HttpStatus.CREATED)
	public Exercise createExercise(@Valid @RequestBody Exercise exercise, HttpServletResponse response) {
		return exerciseRepository.save(exercise);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REMOVE_EXERCISE')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void removeExersice(@PathVariable Long id) {
		exerciseRepository.deleteById(id);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_EXERCISE')")
	public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @Valid @RequestBody Exercise exercise) {
		Exercise exerciseSaved = exerciseService.update(id, exercise);
		return ResponseEntity.ok(exerciseSaved);
	}

	@PutMapping("/{id}/active")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_EXERCISE')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateActiveProperty(@PathVariable Long id, @RequestBody Boolean active) {
		exerciseService.updateActiveProperty(id, active);
	}
}
