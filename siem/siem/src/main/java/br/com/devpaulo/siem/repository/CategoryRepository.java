package br.com.devpaulo.siem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devpaulo.siem.domain.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
