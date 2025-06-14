export type MonadState = 'hypermodulated' | 'bored' 
export type ImpressedObject = ''

export type MentalObject = ''

export type GazeCharge = 'good' | 'bad' | 'neutral'

export type Refinement = '' 
export type Valence = 'good' | 'bad' | 'neutral'

export type ReificatoryChannel = 'semantic' | 'voice' | 'gaze' |  'touch' | 'proximity'




export interface Subject {
  gaze: Object[]
  chargeMap: Map<Object, Valence>
}

export interface ReificatoryScene {
  subjects: Subject[]
}

export interface Object { 
   
}
