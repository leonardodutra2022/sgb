package br.ufc.crateus.sgb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Usuario;

/**
 * Repositório CRUD para a entidade Usuario
 * @author Leonardo Dutra
 * @see Usuario
 */
@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long>{
	@Query("SELECT u FROM Usuario u WHERE u.nomeUsuario = :nomeUsuario AND u.senha = :senha")
	Usuario hasUser(String nomeUsuario, String senha);
	Usuario findByNomeUsuario(String nomeUsuario);
	Usuario findById(long id);
	Usuario findBySiape(long matricula);
	Optional<Usuario> findByEmail(String email);
	List<Usuario> findAll();
	List<Usuario> findAllByOrderByNomeCompletoAsc();
	
	@Query("SELECT u FROM Usuario u WHERE u.papel NOT IN ('Aluno') ORDER BY u.nomeCompleto ASC")
	List<Usuario> findCustomResponsaveis();
}
