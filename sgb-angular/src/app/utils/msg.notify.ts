interface MSG {
    title: string;
    info: string;
}

export class MsgNotify {
    public static MSG_INFO: MSG = {title: "Validação", info: "Verifique os dados preenchidos, visando corrigir ausência de algum!"}
    public static MSG_ERR: MSG = {title: "Erro", info: "Erro ao tentar cadastrar!"};
    public static MSG_SUCCESS: MSG = {title: "Registro", info: "Cadastro Realizado com Sucesso!"};
    public static MSG_UPDATE: MSG = {title: "Atualização", info: "Atualização Efetuada!"};
}