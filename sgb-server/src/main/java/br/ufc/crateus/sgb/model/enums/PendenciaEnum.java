package br.ufc.crateus.sgb.model.enums;

/**
 * Enum contém categorias e/ou etapas do cadastro geral que compõe a inscrição do aluno, ou seja, quando há uma pendência lançada quanto a inscrição, este enum classifica qual parte da inscrição a pendência está.
 * @author Leonardo Dutra
 */
public enum PendenciaEnum {
	INSCRICAO_SOCIOECONOMICO, 
	INSCRICAO_DADOS_PESSOAIS,
	INSCRICAO_DOCUMENTACAO,
	INSCRICAO_LOGRADOURO_CONTATO,
	INSCRICAO_MORADIA_TRANSPORTE,
	INSCRICAO_INFO_FINANCAS,
	INSCRICAO_INFO_ACAD,
	INSCRICAO_OUTROS_AUXILIOS,
	INSCRICAO_SAUDE
}
