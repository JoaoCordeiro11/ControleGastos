interface Props {
    mensagem: string;
    aoConfirmar: () => void;
    aoCancelar: () => void;
}

function ConfirmModal({ mensagem, aoConfirmar, aoCancelar }: Props) {

    return (

        <div className="modal-fundo" onClick={aoCancelar}>

            <div className="modal-caixa" onClick={(e) => e.stopPropagation()}>

                <p>{mensagem}</p>

                <div className="modal-botoes">

                    <button className="botao-cancelar" onClick={aoCancelar}>
                        Cancelar
                    </button>

                    <button className="botao-excluir" onClick={aoConfirmar}>
                        Excluir
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;