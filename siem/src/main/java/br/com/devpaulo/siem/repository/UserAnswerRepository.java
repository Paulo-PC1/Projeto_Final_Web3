package br.com.devpaulo.siem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devpaulo.siem.domain.model.UserAnswer;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

}
