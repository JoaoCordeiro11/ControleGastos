interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: string;
    pessoaId: number;
    pessoaNome: string;
}

interface Props {
    transacoes: Transacao[];
}

function TransacaoLista({ transacoes }: Props) {

    return (

        <div>

            <h2>Transações</h2>

            {transacoes.length === 0 ? (

                <p className="lista-vazia">Nenhuma transação cadastrada ainda.</p>

            ) : (

                <table border={1} cellPadding={8}>

                    <thead>

                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                            <th>Pessoa</th>
                        </tr>

                    </thead>

                    <tbody>

                        {transacoes.map(transacao => (

                            <tr key={transacao.id}>

                                <td>{transacao.descricao}</td>
                                <td className={transacao.tipo === "Receita" ? "texto-receita" : "texto-despesa"}>
                                    {transacao.valor.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })}
                                </td>
                                <td>

                                    <span
                                        className={
                                            transacao.tipo === "Receita"
                                                ? "badge-receita"
                                                : "badge-despesa"
                                        }
                                    >
                                        {transacao.tipo}
                                    </span>

                                </td>
                                <td>{transacao.pessoaNome}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default TransacaoLista;