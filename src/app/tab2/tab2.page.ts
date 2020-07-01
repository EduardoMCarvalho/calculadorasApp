import { Component } from '@angular/core';
import { evaluate } from 'mathjs';// importação do mathjs
import { AlertController } from '@ionic/angular';//importação do alet controller

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //declaração de variáveis
  public calculo = '';
  public resultado: string;

  private ponto = false;

  private operações = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) {}

  //método para adicionar número
  adicionarNumero(valor:string) { 
    if(this.resultado){//testa se o resultado tiver um valor
      this.apagarTudo();//metodo de apgar tudo
    }

    this.calculo = this.calculo + valor; // adiciona o numero no calculo
  }

  //metodo para adicionar ponto
  adicionarPonto(){
  //se ponto for = true para a execução
    if(this.ponto){ 
      return;
    }

    this.calculo += "."; //adiciona um ponto ao cálculo
    this.ponto = true; // ponto=true nao deixa mais inserir outro ponto
  }

  //metodo de adicionar operação
  adicionarOperacao(operador: string){ // recebe a string

    if (this.resultado) { //testa se resultado = true
      this.calculo = this.resultado.toString(); // calculo recebe o valor da variavel resultado convertido para string
      this.resultado = null;// limpa o resultado
    }

    const ultimo = this.calculo.slice(-1); // cria const, que se torna o ultimo caracter de calculo
    if(this.operações.indexOf(ultimo) > -1){ // testa se ultimo é igual a alguma operação declarada
      return; // para a execução
    }

    this.calculo += operador; // adiciona o operador no calculo
    this.ponto= false; // permite digitar outro ponto, ponto = false
  }

  //metodo para apagar tudo
  public apagarTudo(){
    this.calculo= ''; // limpa calculo 
    this.resultado= null;// limpa resultado
    this.ponto= false; // permite digitar outro ponto
  }
  
  //metodo para apagar somente o ultimo caractere
  public apagarUltimo() {
    const ultimo = this.calculo.slice(-1);// cria a contante ultimo, que recebe o valor do ultimo caractere de calculo
    if(ultimo == '.') { // testa se ultimo = .
      this.ponto = false;// permite digitar outro ponto
    }

    this.calculo = this.calculo.slice(0, -1);// calculo é igual a calculo - o ultimo caractere
  }

  //metodo para calcular
  public calcularResultado(){
    try{
    this.resultado = evaluate(this.calculo);// resultado é igual a função evaluate de calculo que realiza as operações
    } catch (e) { // se der erro não fecha a aplicação, continua com catch
      this.resultado = ''; // limpa resultado
      this.presentAlert( 'ERRO!!!', 'Cálculo inválido, verifique!') // chama o alert
    }
  }

  // função alert: com a mensagem de erro
  async presentAlert( titulo: string, mensagem: string) { 
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }


}
