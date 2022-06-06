package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.MembroComissao;

@Repository
public interface MembroComissaoRepository extends CrudRepository<MembroComissao, Long>{
	
	List<MembroComissao> findAll();
	MembroComissao findById(long id);

}
