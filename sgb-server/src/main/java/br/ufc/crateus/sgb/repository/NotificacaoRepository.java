package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.Notificacao;
import br.ufc.crateus.sgb.model.enums.StatusEnum;

/**
 * Repositório CRUD para a entidade Notificacao
 * @author Leonardo Dutra
 * @see Notificacao
 */
@Repository
public interface NotificacaoRepository extends CrudRepository<Notificacao, Long>{
	List<Notificacao> findAll();
	Notificacao findById(long id);
	List<Notificacao> findByInscricaoRefAndStatusRefNotificacao(Inscricao inscricaoRef, StatusEnum tipo);
}
