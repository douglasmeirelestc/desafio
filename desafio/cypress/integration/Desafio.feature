#language:pt
@login
Funcionalidade: Login

    @login-sucesso
    Cenario: Realizar login com sucesso
        Dado que acesso o site smiles
        Quando insiro origem "São Paulo (GRU)" e destino "Rio de Janeiro (RIO)"
        E insiro a data de origem e destino
        E busco pelo voo
        E seleciono a primeira opcao de voo disponivel por milhas
        E Scrollo a pagina até o final
        Entao valido o resumo do pedido
        E aceito os termos de aceite