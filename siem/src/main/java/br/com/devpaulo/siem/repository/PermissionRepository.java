package br.com.devpaulo.siem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devpaulo.siem.domain.model.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
	
	
}
