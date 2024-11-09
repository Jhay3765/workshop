'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PokemonCatcher() {
  const [pokemon, setPokemon] = useState<any>(null)
  const [isCaught, setIsCaught] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [caughtPokemon , setCaughtPokemon] = useState([''])

  const fetchRandomPokemon = async () => {
    setIsLoading(true)
    setIsCaught(false)
    try {
      const randomId = Math.floor(Math.random() * 898) + 1 // There are 898 Pokémon in total
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      const json = await res.json()
      setPokemon(json)
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomPokemon()
  }, [])

  const addToBag = (name : string) => {
        setCaughtPokemon((caughtPokemon) => ( 
          [  ...caughtPokemon, name]
          
        ))
      }

  const handleCatch = () => {
    if (Math.random() < 0.5) {
      setIsCaught(true)
      addToBag(pokemon.name)
    } else {
      alert("Oh no! The Pokémon broke free!")
    }
  }

  return (
    <div className='min-h-screen'>
      <nav className='flex justify-between items-center max-w-7xl pt-8 mx-auto px-4'>
        <Image src="/logo.png" alt="Pokemon Logo" width={200} height={100} quality={100} />
        <h1 className='text-3xl font-bold tracking-tighter text-blue-600'>Made By Jerone</h1>
      </nav>
      <Image src="/bg.png" alt="Pokemon Logo" fill quality={100} className='-z-20 opacity-10'/>

      <div className='bg-blue-700/10 size-96 absolute -z-20 blur-3xl rounded-full left-0 top-24 '> </div>
      <div className='bg-yellow-700/10 size-96 absolute -z-20 blur-3xl rounded-full right-0 '> </div>


   

      <main className='max-w-2xl mx-auto mt-16 p-4'>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Catch the Pokemon</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {isLoading ? (
              <div className="text-xl">Loading ...</div>
            ) : pokemon ? (
              <>
                <img 
                  src={pokemon.sprites.front_default} 
                  alt={pokemon.name} 
                  className="w-48 h-48 object-contain"
                />
                <h2 className="text-2xl font-semibold mt-4 capitalize">{pokemon.name}</h2>
                {isCaught ? (
                  <p className="text-green-600 font-bold mt-4">You caught {pokemon.name}!</p>
                ) : (
                  <Button 
                    onClick={handleCatch} 
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform "
                  >
                    Throw Pokeball
                  </Button>
                )}
              </>
            ) : (
              <div className="text-xl text-red-500">Failed to load Pokemon</div>
            )}
          </CardContent>
        </Card>
        
        <Button 
          onClick={fetchRandomPokemon} 
          className="mt-8 w-full bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform "
        >
          Find New Pokémon
        </Button>

        <div className='bg-zinc-700 absolute bottom-8 right-8 px-8 py-8 rounded-xl'> 
          <h2 className='text-xl font-bold mb-2'>Caught Pokemon</h2>
          <div>

            {
              caughtPokemon.map((poke , index)=> {
                return <p key={index}className='text-center'> {poke} </p>
              })
            }
          </div>
   
 
        </div>
      </main>
    </div>
  )
}