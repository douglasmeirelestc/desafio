/* global Given, When, Then */

import Desafio from  '../pageobjects/DesafioPage'
const desafio = new Desafio

Given("que acesso o site smiles", () => {
    desafio.AbrirBrowser();
})

When("insiro origem {string} e destino {string}", (origem,destino) => {
    desafio.PreencherOrigemDestino(origem,destino);
});

And("insiro a data de origem e destino", () => {
    desafio.SelecionarDataOrigem();
});

And("busco pelo voo", () => {
    desafio.ClicarBuscarVoo();
    desafio.VerificarMensagemDeErro();
});

And("seleciono a primeira opcao de voo disponivel por milhas", () => {
    desafio.SelecionarVooMilhas();
});

And("Scrollo a pagina até o final", () => {
    desafio.ScrollarTela();
});

Then("valido o resumo do pedido", () => {
   
});

And("valido a mensagem exibida no email", () => {
   
});

Then("valido o retorno do servico", () => {
    
});

And("aceito os termos de aceite", () => {
   
});