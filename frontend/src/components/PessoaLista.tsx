import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface Pessoa {
    id: number;
    nome: string;
    idade: number;
}

interface Props {
    pessoas: Pessoa[];
    aoExcluir: (id: number) => void;
}

function PessoaLista({ pessoas, aoExcluir }: Props) {

    const [pessoaParaExcluir, setPessoaParaExcluir] = useState<Pessoa | null>(null);

    if (pessoas.length === 0) {
        return (
            <div>
                <h2>Pessoas</h2>
                <p className="lista-vazia">Nenhuma pessoa cadastrada ainda.</p>
            </div>
        );
    }

    return (
        <div>

            <h2>Pessoas</h2> 
           
            {pessoas.map((pessoa) => {

                const iniciais = pessoa.nome
                    .split(" ")
                    .map(nome => nome[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                return (

                    <div
                        key={pessoa.id}
                        className="linha-pessoa"
                    >

                        <div className="info-pessoa">

                            <div className="avatar">

                                {iniciais}

                            </div>

                            <div>

                                <h3>{pessoa.nome}</h3>

                                <p>{pessoa.idade} anos</p>

                            </div>

                        </div>

                        <button
                            className="botao-excluir"
                            onClick={() => setPessoaParaExcluir(pessoa)}
                        >
                            Excluir
                        </button>

                    </div>

                );

            })}

            {pessoaParaExcluir && (

                <ConfirmModal
                    mensagem={`Deseja excluir ${pessoaParaExcluir.nome}?`}
                    aoConfirmar={() => {
                        aoExcluir(pessoaParaExcluir.id);
                        setPessoaParaExcluir(null);
                    }}
                    aoCancelar={() => setPessoaParaExcluir(null)}
                />

            )}

        </div>
    );
}

export default PessoaLista;