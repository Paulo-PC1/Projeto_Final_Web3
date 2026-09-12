package br.com.devpaulo.siem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devpaulo.siem.domain.model.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

}
