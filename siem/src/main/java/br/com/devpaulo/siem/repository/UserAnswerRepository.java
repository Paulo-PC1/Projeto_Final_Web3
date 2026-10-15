package br.com.devpaulo.siem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.devpaulo.siem.domain.model.UserAnswer;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

	@Query("select a from UserAnswer a where a.userId.email = :email order by a.id")
	List<UserAnswer> findByUserEmail(@Param("email") String email);
}
