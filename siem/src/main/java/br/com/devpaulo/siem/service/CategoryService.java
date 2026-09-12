package br.com.devpaulo.siem.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.devpaulo.siem.domain.model.Category;
import br.com.devpaulo.siem.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	public CategoryRepository categoryRepository;
	
	public Category update(Long id, Category category) {
		Category categorySaved = findCategoryByid(id);
		BeanUtils.copyProperties(category, categorySaved, "id");
		return categoryRepository.save(categorySaved);
	}
	
	public Category findCategoryByid(Long id) {
		Category categorySaved = categoryRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return categorySaved;
	}
}
