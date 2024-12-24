import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlay } from 'react-icons/fa'; // Icono para el CTA
import { AiFillGithub } from 'react-icons/ai'; // Icono de redes, puedes ajustar según sea necesario

const games = [
  { title: "Suma Divertida", path: "/suma", color: "bg-teal-400" },
  { title: "Resta Rápida", path: "/resta", color: "bg-pink-400" },
  { title: "Multiplicación Mágica", path: "/multiplicacion", color: "bg-indigo-400" },
  { title: "Formas Geométricas", path: "/geometria", color: "bg-purple-400" },
  { title: "Rompecabezas Numérico", path: "/rompecabezas", color: "bg-orange-400" },
  { title: "Sopa de Números", path: "/sopa-de-numeros", color: "bg-blue-400" },
  { title: "Memoria Matemática", path: "/memoria", color: "bg-green-400" },
  { title: "Sudoku Junior", path: "/sudoku", color: "bg-yellow-400" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-white p-10">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-lg">
        ¡Juegos Matemáticos para Niños!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {games.map((game) => (
          <Link href={game.path} key={game.path}>
            <Card className={`${game.color} transform transition-transform hover:scale-105 shadow-lg rounded-lg overflow-hidden`}>
              <CardHeader className="p-4 flex flex-col items-center">
                <CardTitle className="text-white text-2xl font-semibold mb-2">{game.title}</CardTitle>
                <FaPlay className="text-white text-3xl animate-pulse" />
              </CardHeader>
              <CardContent className="p-4 text-center">
                <p className="text-white text-lg">¡Haz clic para jugar!</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <footer className="mt-12 text-center">
        <p className="text-gray-700 mb-2">Desarrollado por Freddy</p>
        <a href="https://github.com/TuPerfil" target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center justify-center">
          <AiFillGithub className="mr-1" /> Síguenos en Github
        </a>
      </footer>
    </div>
  );
}

