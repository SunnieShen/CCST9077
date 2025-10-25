**T1**
preview video
- types of information
	- difference: disorder (thermodynamics)VS order(biology, gene)
-  same? connection?
	- only need probability(some randomness) to define information
	- geting rid of the all the external things e.g. language
	- challenge: all theoryis based on some laws, but how come we derive these basic laws?
		- informati on can be the one concept to close these problem
		- closed reasoning 
- information is superior
	- physics: start with laws &rarr; derive everything
	- but where does a law come from (infinite regression)
	- answer: information
		- capable of explaining itself
- why not spontaneous generation of information
	- not faith/ god/ religion
	- infinite regression &rArr; more complex
	- might never get there, but follow the scientific method
	- make sense for oneself
- socially generated construct: emotion/ free well/ aethetic/ love &rArr; no idea
	- quantum physics: grey between black and white
	- probability: something genuine randomness
- humanity information
	- meaningful information: different context
- are we immortal
	- copy/ ethical issue?
- important phase of development
	- information consistently being created
	- symphasis, explain using a set of only a few rules
	- hope
### L2
**MOORE’S LAW:** #transistors doubles/ 2 year
- summarize, observation
- intel: integrated electronics
- 3nm: r of atoms ~0.1nm, of hair ~50,000nm
- end of Moore's law?
	- new approach: quantum mechanics (state of the atom)&rArr; new type of computers
	- • new units of information: qubits instead of bits
	  • new ways to transmit information: quantum communication
	  • new way to process information: quantum information processing
**Intro to quantum information**
- ball in box
	- definite states
	- superposition states &rarr; probability
	  > scientific method: hypothesis &rarr; experiments
	  
	-  H1: fluid
	- H2: the ball is either on the left or on the right, but we do not know where it is
		- shake the box: swap classic superposition
- Qubits
**uniqueness of quantum information processing**
- no cloning: cannot copy the state of qubits
- cannot be stored in bits


### Midterm concepts review
L1
- what made information technology possible 2+2
- what is information
	- everyday
	- general
- why information important (forecast + decision making)
- quantifying information (measure the amount of information)
	- find out the sequence: by asking question
- bits (what?>>>unit significance?)
- information processing (bg+3)
	- development 3+4+2+next
	- storage
		- df (store into physical object)
		- physical realization (encode into property of object)
		- compression (prior knowledge)
	- transmission
		- df (move place to place)
		- physical realization(encode, decode, traveling object)
		- special case: storage
	- computation
		- df(input, output, basic operation)
		- physical realization(physical interact)
- information revolution
- it from bit(everything in the universe is made of information)
- can everything be reduced to information
L2
- Moore's law(what? significance? not law of nature; quantify)
> scientific method (hypotheses+experiment)
- ball in box
	- superposition states
	- state collapse (experiment change the state of the system)
	- Hype1: superposition state &rArr; always L
	- Hype2: classic state, but we don't know which &rArr; can be R
	- magic shake(L &rarr; super; super &rarr; L )
	- result: always L
- qubits: 2 alternative states+quantum superposition, significance
- quantum information (no cloning + no stored into bits)
	- bits &rarr; qubits
- quantum information processing
	- magic shake, open
- it from qubits (everything in the universe made of qubits)
L3
> linearly polarized photon as qubits
- entanglement
	- bell state (know relation, don't know exact which which &lArr; dependence) (new state; not either both L or both R)
	- whole vs part
- spooky action at distance
	- message transfer no faster than light &rArr; no message transfer
	
- steering
	- **measurement on A** force B to acquire a **definite quantum state**
	- **choice of A's measurement** determines **possible states of B**
> no faster than light communication
> B don't know A's choice of steering or not? -- e.g. H from +45/-45/H

L4
- EPR paper
	- property(independent of measurement) 
	- reality(local, cannot be affected by another system?)
	- Bell state (incomplete description of reality)
- Bell's theorem (complete)
	- realism (reality independent of measurement)
	- locality (independent of others)
	- local realistic: (complete description of reality) +locality
- Violation of Bell inequality
- True randomness
- device independent random number generation

Notes:
# L5_modern cryptography
- one-time pad: 1(flip) 0(remain)
	- secure
		- length(key) == length(message)
		- random
		- no recycle
- quantum key distribution (QKD)
	- E91 protocol: pair of entangled quantum
		- Bell state, announce measurement, check result
		- observation in between must hve influence
	- BB84 protocol: single quantumn
		- steps: preparation(A) &rArr; measurement(B) &rArr; shifting(public discussion) &rArr; detection
		- shifting: AB with different measurement &rArr; collapse at B &rarr; dismiss this bit
		- detection: AB same measurement, 50% eve choose the wrong measurement &rArr; qubit collapse to the other state &rArr; change the B's observation result &rarr; select random sample bits to test correctness
