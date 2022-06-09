import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorClass } from '../model/error.class';

interface Message {
  msg: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageToastrService {

  msg: Message;

  constructor(private toastr: ToastrService) { }

  sucess(opcao: string, title: string){
    switch(opcao){
      case "c":
        this.msg = {msg: "Inclusão sucedida!", title: title};
        break;
      case "u":
        this.msg = {msg: "Atualização bem sucedida!", title: title};
        break;
      case "d":
        this.msg = {msg: "Exclusão bem sucedida!", title: title};
        break;
      case "a":
        this.msg = {msg: "Autenticação bem sucedida!", title: title};
        break;
      case "up":
        this.msg = {msg: "Arquivo enviado com sucesso!", title: title};
        break;
      case "v":
        this.msg = {msg: "Validação Concluída!", title: title};
        break;
    }
    this.toastr
      .success(this.msg.msg, this.msg.title)
  }

  error(objErro: ErrorClass){
    switch(objErro.statusCode){
      case 401:
        objErro.descricao = "Acesso não autorizado a esse recurso ou página";
        break;
      case 400:
        if(objErro.message != null){
          objErro.descricao = objErro.errors.toString();
          objErro.message = objErro.message;
        }else{
          objErro.descricao = "Esse erro costuma estar relacionado a algum dado fornecido incorretamente quanto ao formato, ausência ou fora do padrão";
          objErro.message = "Verifique os dados e tente novamente";
        }
        break;
      case 403:
          objErro.descricao = "Esse erro indica que o recurso pelo qual você está utilizando não está liberado para seu perfil";
          objErro.message = "Acesso Negado";
          break;
      case 404:
        objErro.descricao = "Esse erro indica que o resultado pelo qual você está buscando não foi encontrado";
        objErro.message = "Altere os parâmetros para haver resultados";
        break;
      case 500:
        objErro.descricao = "No momento o serviço está instável ou indisponível, tente novamente em alguns minutos"
        break;
      default:
        objErro.descricao = "Erro de Requisição... O Serviço pode estar indisponível ou instável";
        
    }
    this.toastr.error(`Erro ao tentar concluir operação: ${objErro.message}. ${objErro.descricao}`,
            `${objErro.statusCode > 0 ? 'Erro ' + objErro.statusCode + 
            `  ${objErro.recurso ? `[ ${objErro.recurso} ]` : ''}` : 'Serviço Indisponível'}!`)
  }

  alertWarning(msg: string){
    this.toastr.warning(msg, "Importante!")
  }

  info(msg: string){
    this.toastr.info(msg, "Informativo");
  }
}
