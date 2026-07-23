import { useEffect, useState } from "react";
import api from "../services/api";

interface Pessoa {
    id: number;
    nome: string;
}

interface Props {
    pessoas: Pessoa[];
    aoCadastrar: () => void;
}

function TransacaoForm({ pessoas, aoCadastrar }: Props) {

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("Despesa");
    const [pessoaId, setPessoaId] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    useEffect(() => {

        if (pessoas.length === 0) {

            setPessoaId("");

            return;

        }

        const existe = pessoas.some(
            p => p.id.toString() === pessoaId
        );

        if (!existe) {

            setPessoaId(pessoas[0].id.toString());

        }

    }, [pessoas, pessoaId]);

    async function cadastrar(e: React.FormEvent) {

        e.preventDefault();

        if (descricao.trim() === "") {
            setErro(true);
            setMensagem("Informe a descrição.");
            return;
        }

        if (valor.trim() === "") {
            setErro(true);
            setMensagem("Informe o valor.");
            return;
        }

        if (Number(valor) <= 0) {
            setErro(true);
            setMensagem("O valor deve ser maior que zero.");
            return;
        }

        if (pessoaId === "") {
            setErro(true);
            setMensagem("Selecione uma pessoa.");
            return;
        }

        try {

            await api.post("/Transacoes", {
                descricao,
                valor: Number(valor),
                tipo,
                pessoaId: Number(pessoaId)
            });

            setErro(false);
            setMensagem("Transação cadastrada com sucesso!");

            setDescricao("");
            setValor("");
            setTipo("Despesa");

            aoCadastrar();

        } catch (erro: any) {

            setErro(true);
            setMensagem(
                erro.response?.data ?? "Erro ao cadastrar transação."
            );

        }

    }

    return (

        <form onSubmit={cadastrar}>

            <h2>Nova Transação</h2>

            <input
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
            />

            <br /><br />

            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
            >
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
            </select>

            <br /><br />

            <select
                value={pessoaId}
                onChange={(e) => setPessoaId(e.target.value)}
            >
                {pessoas.map((pessoa) => (
                    <option
                        key={pessoa.id}
                        value={pessoa.id}
                    >
                        {pessoa.nome}
                    </option>
                ))}
            </select>

            <br /><br />

            {mensagem && (

                <p
                    style={{
                        color: erro ? "#dc2626" : "#16a34a",
                        fontWeight: "bold",
                        marginBottom: "15px"
                    }}
                >
                    {mensagem}
                </p>

            )}

            <button type="submit">
                Cadastrar Transação
            </button>

        </form>

    );

}

export default TransacaoForm;