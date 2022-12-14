import './App.css'
import { useState, useEffect } from 'react'

const initMatrix = []

function App() {

  const [matrix, setMatrix] = useState(initMatrix) //array for the matrix
  const [matrixSize, setMatrixSize] = useState(3)
  const [currentPlayer, setCurrentPlayer] = useState("O")
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [winner, setWinner] = useState(false)
  const [reset, setReset] = useState(false)

  useEffect ( () => {

    setWinner(false)
    setSelectedColumn(null)
    setSelectedRow(null)

    // 1.1- we create an empty array (filled with nulls) with the size of the variable 'matrixSize', which is 3 right now
    const row = new Array(matrixSize).fill(null)
    
    // 1.2- this array is only temporary
    const tempMatrix = []

    // 1.3- we iterate a for where its max lengh is 3: in each iteration we add the array created in the 1.2 step; and inside this array, we put the array created in the step 1.1 (which is a arry of 3 with all nulls)
    for(let i=0; i<matrixSize; i++){
      tempMatrix.push([...row])
    }

    // 1.4- now we moidify (with its setter) the value of matrix
    setMatrix(tempMatrix)

  }, [reset])

  const squareClick = (row, column) => {
    ////alert("row: " + row + " & column: " + column)

    // 3.1- with this 'if' we can check that there's nothing already printed in the cell
    //* 4.3- we don't want to print anything if there's a winner so we have to add the condition in the 'if'
    if(!matrix[row][column] && !winner){
      //* 4.4- we want to save the row and the column
      setSelectedRow(row)
      setSelectedColumn(column)

      // 3.2- here we set the next player with a ternary operator into a method variable
      let nextPlayer = currentPlayer === "X" ? "O" : "X"

      // 3.3- we set the current player into the local variable from the method variable
      setCurrentPlayer(nextPlayer)

      // 3.4- we copy the current matrix
      const matrixCopy =  [...matrix]

      // 3.5- we print in the copy matrix the current player in the cell we've clicked
      matrixCopy[row][column] = nextPlayer

      // 3.6- we set the matrix with the copy one so the original matrix it's updated
      setMatrix(matrixCopy)
    }
  }

  

   //* 4.5- inside this function we write down the logic behind "if there's a winner o not"
   const isWinner = () => {
    ////alert("checking for winner")
    let vertical = true
    let horizontal = true
    let d1 = true
    let d2 = true

    if(selectedColumn===null || selectedRow===null){
      return
    }

    for (let i=0; i<matrixSize; i++){
      if(matrix[i][selectedColumn] !== currentPlayer){
        vertical = false
      }

      if(matrix[selectedRow][i] !== currentPlayer){
        horizontal = false
      }

      if(matrix[i][i] !== currentPlayer){
        d1 = false
      }

      if(matrix[i][matrixSize-i-1] !== currentPlayer){
        d2 = false
      }
    }

    if(vertical || horizontal || d1 || d2 ){
      setWinner(true)
    }

  }


  //* 4.1- we use a useEffect to check if someone won
  useEffect( ()=> {
    //* 4.2- if winner is false then execute the next function in order to check if the value changed
    if(!winner){
      isWinner()
    }
  })

  const resetGame = () =>{
    setReset(!reset)
  }


  return (
    <div className="App">
      <button onClick={resetGame} className='button'>Reset</button>
     { // 2.1- now we iterate the array 'matrix' and we show the values
     matrix.map((val, column) => (
      <div className='column'>
        {val.map((val, row) => (
          <div onClick={()=> {squareClick(row,column)}} className='row'> {matrix[row][column]}</div>
          ))}
      </div>
     ))
     }
     <h2>{winner ? `${currentPlayer} is the winner` : ""}</h2>
    </div>

  )
}

export default App
