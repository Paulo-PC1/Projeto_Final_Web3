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

import br.com.devpaulo.siem.domain.model.UserAnswer;
import br.com.devpaulo.siem.repository.UserAnswerRepository;
import br.com.devpaulo.siem.service.UserAnswerService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("user_Answer")
public class UserAnswerController {

	@Autowired
	private UserAnswerRepository userAnswerRepository;
	
	@Autowired 
	private UserAnswerService userAnswerService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_ANSWER')")
	public List<UserAnswer> findAll(){
		return userAnswerRepository.findAll();
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_ANSWER')")
	public ResponseEntity<UserAnswer> findById(@PathVariable Long id){
		Optional<UserAnswer> userAnswer = userAnswerRepository.findById(id);
		if(userAnswer.isPresent()) {
			return ResponseEntity.ok(userAnswer.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_REGISTER_ANSWER')")
	@ResponseStatus(HttpStatus.CREATED)
	public UserAnswer createUserAnswer(@Valid @RequestBody UserAnswer userAnswer, HttpServletResponse response) {
		return userAnswerRepository.save(userAnswer);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REMOVE_ANSWER')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void removeUserAnswer(@PathVariable Long id) {
		userAnswerRepository.deleteById(id);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_ANSWER')")
	public ResponseEntity<UserAnswer> updateUserAnswer(@PathVariable Long id, @Valid @RequestBody UserAnswer userAnswer) {
		UserAnswer userAnswerSaved = userAnswerService.update(id, userAnswer);
		return ResponseEntity.ok(userAnswerSaved );
	}
}
