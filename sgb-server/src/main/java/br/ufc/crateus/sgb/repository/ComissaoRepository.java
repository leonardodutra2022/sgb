package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Comissao;

@Repository
public interface ComissaoRepository extends CrudRepository<Comissao, Long>{
	
	List<Comissao> findAll();
	Comissao findById(long id);

}
