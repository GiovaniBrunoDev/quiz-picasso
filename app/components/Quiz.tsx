"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";



export default function Quiz() {


    const [enviando, setEnviando] = useState(false);
    const [step, setStep] = useState(0);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [opcaoData, setOpcaoData] = useState("");
    const totalSteps = 8;
    const dateRef = useRef<HTMLInputElement | null>(null);

    const [respostas, setRespostas] = useState({
        nome: "",
        data_visita: "",
        origem_cliente: "",
        frequencia: "",
        expectativa: "",
        avaliacao: "",
        positivos: "",
        melhorias: ""
    });

    const next = () => setStep((prev) => prev + 1);

    const progress = (step / totalSteps) * 100;

    function salvarResposta(pergunta: string, resposta: string) {

        setRespostas((prev) => ({
            ...prev,
            [pergunta]: resposta
        }));

        next();
    }

    async function enviarAvaliacao(melhorias: string) {

        setEnviando(true);

        const dados = {
            ...respostas,
            melhorias
        };

        await fetch("/api/enviar-avaliacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        setEnviando(false);

        if (
            respostas.avaliacao.includes("Excelente") ||
            respostas.avaliacao.includes("Muito bom")
        ) {
            setStep(7); // tela Google
        } else {
            setStep(8); // tela obrigado
        }
    }

    return (

        <div className="w-full min-h-[100dvh] flex items-center justify-center px-4">

            <motion.div
                layout
                className="w-[92vw] max-w-xl min-h-[60dvh] bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center"
            >

                {step > 0 && step <= totalSteps && (

                    <div className="w-full bg-gray-200 h-[4px] rounded-full mb-8 sm:mb-10 overflow-hidden">

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4 }}
                            className="h-[4px] bg-picasso-gold"
                        />

                    </div>

                )}

                <AnimatePresence mode="wait">

                    {step === 0 && (

                        <motion.div
                            key="hero"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-10 max-w-md mx-auto"
                        >

                            <Image
                                src="/logo-picasso.png"
                                alt="Picasso"
                                width={200}
                                height={90}
                                className="mx-auto"
                            />

                            <div className="w-20 h-[2px] bg-picasso-gold mx-auto opacity-70"></div>

                            <div className="space-y-4">

                                <p className="text-gray-500 text-sm tracking-wide uppercase">
                                    Sua opinião é importante
                                </p>

                                <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
                                    Avalie sua experiência
                                    <span className="block text-picasso-gold mt-1">
                                        e ganhe um brinde.
                                    </span>
                                </h1>

                                <p className="text-gray-400 text-sm">
                                    Leva menos de 2 minutos para responder.
                                </p>

                            </div>

                            <div className="flex justify-center">

                                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                                    <span>⚡ 6 perguntas</span>
                                    <span>•</span>
                                    <span>⏱ 2 minutos</span>
                                </div>

                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={next}
                                className="
    mt-4
    border
    border-picasso-gold
    text-picasso-gold
    px-10
    py-4
    rounded-full
    text-base
    font-medium
    hover:bg-picasso-gold
    hover:text-black
    transition
    shadow-sm
    "
                            >
                                Iniciar avaliação
                            </motion.button>

                        </motion.div>

                    )}

                    {step === 1 && (

                        <motion.div
                            key="dados"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6 w-full max-w-md"
                        >

                            <h2 className="text-2xl font-semibold text-center">
                                Antes de começar
                            </h2>

                            <p className="text-gray-500 text-sm text-center">
                                Informe seu nome e quando visitou o Picasso
                            </p>

                            <input
                                type="text"
                                placeholder="Seu nome"
                                value={respostas.nome}
                                onChange={(e) =>
                                    setRespostas((prev) => ({
                                        ...prev,
                                        nome: e.target.value
                                    }))
                                }
                                className="w-full border border-gray-200 p-4 rounded-xl text-base"
                            />

                            <div className="space-y-3">

                                <p className="text-sm text-gray-500 text-left">
                                    Quando foi sua visita ao restaurante?
                                </p>

                                <div className="flex gap-2">

                                    {/* HOJE */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const hoje = new Date().toISOString().split("T")[0];

                                            setRespostas((prev) => ({
                                                ...prev,
                                                data_visita: hoje
                                            }));

                                            setOpcaoData("hoje");
                                            setMostrarCalendario(false);
                                        }}
                                        className={`flex-1 py-3 rounded-xl text-sm border transition
      ${opcaoData === "hoje"
                                                ? "bg-picasso-gold text-black border-picasso-gold"
                                                : "border-gray-200 hover:border-picasso-gold"
                                            }`}
                                    >
                                        Hoje
                                    </button>

                                    {/* ONTEM */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const ontem = new Date();
                                            ontem.setDate(ontem.getDate() - 1);

                                            setRespostas((prev) => ({
                                                ...prev,
                                                data_visita: ontem.toISOString().split("T")[0]
                                            }));

                                            setOpcaoData("ontem");
                                            setMostrarCalendario(false);
                                        }}
                                        className={`flex-1 py-3 rounded-xl text-sm border transition
      ${opcaoData === "ontem"
                                                ? "bg-picasso-gold text-black border-picasso-gold"
                                                : "border-gray-200 hover:border-picasso-gold"
                                            }`}
                                    >
                                        Ontem
                                    </button>

                                    {/* OUTRA DATA */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpcaoData("outra");
                                            setMostrarCalendario(true);

                                            setTimeout(() => {
                                                (dateRef.current as HTMLInputElement)?.showPicker?.();
                                            }, 50);
                                        }}
                                    >
                                        Outra data
                                    </button>

                                </div>

                                {mostrarCalendario && (
                                    <input
                                        ref={dateRef}
                                        type="date"
                                        value={respostas.data_visita}
                                        onChange={(e) =>
                                            setRespostas((prev) => ({
                                                ...prev,
                                                data_visita: e.target.value
                                            }))
                                        }
                                        className="
      w-full
      border
      border-gray-200
      p-4
      rounded-xl
      text-base
      bg-white
      focus:outline-none
      focus:border-picasso-gold
      focus:ring-1
      focus:ring-picasso-gold
      "
                                    />
                                )}

                                <p className="text-xs text-gray-400 text-left">
                                    Isso nos ajuda a identificar melhor sua experiência.
                                </p>

                            </div>

                            <button
                                onClick={next}
                                className="border border-picasso-gold text-picasso-gold px-6 py-3 rounded-full hover:bg-picasso-gold hover:text-black transition w-full"
                            >
                                Continuar
                            </button>

                        </motion.div>

                    )}

                    {step === 2 && (
                        <Pergunta
                            titulo="Com que frequência você vem ao Picasso?"
                            opcoes={[
                                "🍸 Primeira vez",
                                "🙂 Já vim algumas vezes",
                                "🔥 Venho com frequência",
                                "⭐ Sou cliente fiel"
                            ]}
                            responder={(r: string) => salvarResposta("frequencia", r)}
                        />
                    )}

                    {step === 3 && (
                        <Pergunta
                            titulo="Antes de visitar, qual era sua expectativa?"
                            opcoes={[
                                "✨ Lugar sofisticado",
                                "🍹 Lugar moderno e animado",
                                "🤔 Não sabia muito sobre o lugar",
                                "👀 Vim por curiosidade"
                            ]}
                            responder={(r: string) => salvarResposta("expectativa", r)}
                        />
                    )}

                    {step === 4 && (
                        <Pergunta
                            titulo="Como foi sua experiência?"
                            opcoes={[
                                "⭐⭐⭐⭐⭐ Excelente",
                                "⭐⭐⭐⭐ Muito bom",
                                "⭐⭐⭐ Bom",
                                "⭐⭐ Regular",
                                "⭐ Ruim"
                            ]}
                            responder={(r: string) => salvarResposta("avaliacao", r)}
                        />
                    )}

                    {step === 5 && (
                        <PerguntaTexto
                            key="positivos"
                            titulo="Quais foram os pontos positivos?"
                            onEnviar={(texto: string) => {
                                setRespostas((prev) => ({
                                    ...prev,
                                    positivos: texto
                                }))
                                next()
                            }}
                        />
                    )}

                    {step === 6 && (
                        <PerguntaTexto
                            key="melhorias"
                            titulo="Algo que podemos melhorar?"
                            onEnviar={(texto: string) => enviarAvaliacao(texto)}
                            loading={enviando}
                        />
                    )}
                    {step === 7 && (

                        <motion.div
                            key="google"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6"
                        >

                            <h1 className="text-3xl font-semibold">
                                Ficamos muito felizes que você gostou! 💛
                            </h1>

                            <p className="text-gray-500">
                                Seu comentário no Google ajuda
                                muitas pessoas a descobrirem o Picasso.
                            </p>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                href="https://www.google.com/search?sca_esv=d351541170fbfe96&sxsrf=ANbL-n7JaDVOcC_KArbHREa13ZvyTjzpFA:1773635283928&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZ6ccwHXsTbL8VRQAM-zT105NhsjCxW9GYp5Pc8ywb9pogInt2Um_V6_lRNiuAL4XzffxNurKIMY5QhhZBcEa5LLx-6B1F9PksSoOgXEv5rpelKzWA%3D%3D&q=Restaurante+Picasso+Coment%C3%A1rios&sa=X&ved=2ahUKEwiw3LyoyqOTAxUQCrkGHZU4Hm4Q0bkNegQILRAF&biw=1920&bih=911&dpr=1#lrd=0x94f3d412f58ba4ed:0x28a6b8bf1e400383,3,,,,"
                                target="_blank"
                                className="inline-block border border-picasso-gold text-picasso-gold px-8 py-4 rounded-full hover:bg-picasso-gold hover:text-black transition"
                            >
                                ⭐ Deixar avaliação no Google
                            </motion.a>

                            <button
                                onClick={() => setStep(8)}
                                className="block text-gray-400 text-sm underline mx-auto"
                            >
                                Pular
                            </button>

                        </motion.div>

                    )}

                    {step === 8 && (

                        <motion.div
                            key="final"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6 sm:space-y-8"
                        >

                            <h1 className="text-3xl sm:text-4xl font-semibold">
                                Obrigado pela sua avaliação!
                            </h1>

                            <p className="text-gray-500 text-sm sm:text-base">
                                Seu feedback nos ajuda a melhorar a experiência no Picasso.
                            </p>

                            <div className="border border-picasso-gold bg-picasso-gray p-6 sm:p-10 rounded-2xl space-y-4">

                                <h2 className="text-xl sm:text-2xl text-picasso-gold font-semibold">
                                    🍸 Drink Especial para Você
                                </h2>

                                <p className="text-gray-600">
                                    Apresente esta tela ao garçom na próxima visita.
                                </p>

                            </div>

                        </motion.div>

                    )}

                </AnimatePresence>

            </motion.div>

        </div>

    );

}

function Pergunta({ titulo, opcoes, responder }: any) {

    return (

        <div className="space-y-6">

            <h2 className="text-xl sm:text-2xl font-semibold text-center">
                {titulo}
            </h2>

            <div className="space-y-3">

                {opcoes.map((opcao: string, index: number) => (

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        key={index}
                        onClick={() => responder(opcao)}
                        className="w-full border border-gray-200 p-4 sm:p-5 rounded-xl text-left text-base sm:text-lg transition hover:border-picasso-gold hover:bg-gray-50"
                    >
                        {opcao}
                    </motion.button>

                ))}

            </div>

        </div>

    );

}

function PerguntaTexto({
    titulo,
    onEnviar,
    loading = false
}: {
    titulo: string;
    onEnviar: (texto: string) => void;
    loading?: boolean;
}) {

    const [texto, setTexto] = useState<string>("");

    return (

        <div className="space-y-6">

            <h2 className="text-xl sm:text-2xl font-semibold text-center">
                {titulo}
            </h2>

            <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className="w-full border border-gray-200 p-4 rounded-xl text-base"
                rows={3}
            />

            <button
                disabled={loading}
                onClick={() => onEnviar(texto)}
                className="
                border border-picasso-gold
                text-picasso-gold
                px-6 py-3
                rounded-full
                hover:bg-picasso-gold
                hover:text-black
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
                "
            >
                {loading ? "Registrando sua experiência.." : "Enviar Avaliação"}
            </button>

        </div>

    );

}   