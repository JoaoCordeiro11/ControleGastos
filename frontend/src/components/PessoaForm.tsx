import { useState } from "react";
import api from "../services/api";

interface Props {
    aoCadastrar: () => void;
}

function PessoaForm({ aoCadastrar }: Props) {

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    async function cadastrar(e: React.FormEvent) {

        e.preventDefault();

        if (nome.trim() === "") {
            setErro(true);
            setMensagem("Informe o nome.");
            return;
            
        }

        if (idade.trim() === "") {
            setErro(true);
            setMensagem("Informe a idade.");
            return;
        }

        if (Number(idade) <= 0) {
            setErro(true);
            setMensagem("A idade deve ser maior que zero.");
            return;
        }

        try {

            await api.post("/Pessoas", {
                nome,
                idade: Number(idade)
            });

            setErro(false);
            setMensagem("Pessoa cadastrada com sucesso!");


            setNome("");
            setIdade("");

            aoCadastrar();

        } catch (erro: any) {

            setErro(true);
            setMensagem(erro.response?.data ?? "Erro ao cadastrar pessoa.");

        }

    }

    return (
        <form onSubmit={cadastrar}>

            <h2>Nova Pessoa</h2>

            <input
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
            />

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
                Cadastrar
            </button>

        </form>
    );
}

export default PessoaForm;