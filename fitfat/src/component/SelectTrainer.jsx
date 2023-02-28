import React from 'react'
import { useFetchTrainersQuery } from '../store'


function SelectTrainer({ trainer }) {
  return (
    <>
      <option value={0}>{trainer.trainerName}</option>
    </>
  )
}

export default SelectTrainer