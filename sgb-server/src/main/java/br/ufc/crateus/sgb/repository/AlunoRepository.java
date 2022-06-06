package br.ufc.crateus.sgb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Aluno;

/**
 * Repositório CRUD para a entidade Aluno
 * @author Leonardo Dutra
 * @see Aluno
 */
@Repository
public interface AlunoRepository extends CrudRepository<Aluno, Long>{
	
	
	/**
	 * Método responsável por procurar registro de aluno por ID
	 * @param id ID informado, visando efetuar consulta na base
	 * @return Retorna um objeto Aluno, após consulta
	 */
	Aluno findById(long id);
	
	List<Aluno> findAllById(long id);
	
	/**
	 * Método responsável por obter uma lista ordenada ascendentemente pelo nome de alunos
	 * @return Lista de objetos Aluno
	 */
	List<Aluno> findAllByOrderByNomeCompletoAsc();
	
	
	/**
	 * Método responsável por procurar na base aluno usando a matricula informada
	 * @param matricula Matricula informada para procura de um objeto aluno
	 * @return Retorna uma objeto Aluno, quando encontrado
	 */
	Aluno findBySiape(long matricula);
	
	
	/**
	 * Método responsável por procurar na base um aluno usando o CPF informado
	 * @param cpf CPF informado para procura do aluno
	 * @return Retorna um objeto Aluno, quando encontrado
	 */
	Aluno findByCpf(String cpf);
	
	
	/**
	 * Método responsável por obter uma lista ordenada pelo nome de alunos que foram previamente cadastrados pela comissão, 
	 * mas que os alunos precisam ou irão ainda completar seus cadastros em algum momento
	 * @return Lista de objetos Aluno
	 */
	@Query("SELECT a FROM Aluno a WHERE a.email <> '@' ORDER BY a.nomeCompleto")
	List<Aluno> findGeral();
	
	
	/**
	 * Método responsável por listar todos os registros referentes a aluno
	 * @return Retorna uma lista completa dos registros de alunos
	 */
	List<Aluno> findAll();

	@Query("SELECT a FROM Aluno a WHERE a.email <> '@'")
	List<Aluno> findValid();

	Optional<Aluno> findByEmail(String email);

}
