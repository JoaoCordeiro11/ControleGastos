interface TotalPessoa {
    nome: string;
    receitas: number;
    despesas: number;
    saldo: number;
}

interface TotaisGerais {
    pessoas: TotalPessoa[];
    totalReceitas: number;
    totalDespesas: number;
    saldoGeral: number;
}

interface Props {
    dados?: TotaisGerais;
}

function Totais({ dados }: Props) {

    if (!dados) {
        return <p>Carregando totais...</p>;
    }

    return (
        <div>

            <h2>Totais</h2>

            <table border={1} cellPadding={8}>

                <thead>
                    <tr>
                        <th>Pessoa</th>
                        <th>Receitas</th>
                        <th>Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>

                <tbody>

                    {dados.pessoas.map((pessoa) => (

                        <tr key={pessoa.nome}>

                            <td>{pessoa.nome}</td>

                            <td className="texto-receita">
                                {pessoa.receitas.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </td>

                            <td className="texto-despesa">
                                {pessoa.despesas.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </td>

                            <td>

                                <span
                                    className={
                                        pessoa.saldo > 0
                                            ? "saldo-positivo"
                                            : pessoa.saldo < 0
                                                ? "saldo-negativo"
                                                : "saldo-neutro"
                                    }
                                >
                                    {pessoa.saldo.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })}
                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="cards-totais">

                <div className="card-total receita">

                    <h3>💰 Receitas</h3>

                    <h2>
                        {dados.totalReceitas.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </h2>

                </div>

                <div className="card-total despesa">

                    <h3>💸 Despesas</h3>

                    <h2>
                        {dados.totalDespesas.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </h2>

                </div>

                <div className="card-total saldo">

                    <h3>📈 Saldo</h3>

                    <h2>
                        {dados.saldoGeral.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </h2>

                </div>

            </div>

        </div>
    );

}

export default Totais;