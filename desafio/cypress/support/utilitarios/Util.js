class Util {
    PegarData() {
        return new Date().toLocaleDateString();
    }

    PegarHora() {
        return new Date().toLocaleTimeString('en-US', { hour12: false, 
                                                        hour: "numeric", 
                                                        minute: "numeric"});
    }

    PegarDataCompletaString() {
        var opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var dia  = new Date();

        return dia.toLocaleDateString("pt-BR", opcoes);
    }
}
export default Util