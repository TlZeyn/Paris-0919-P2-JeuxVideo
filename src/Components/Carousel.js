import React, { Component } from 'react';

import Cyril from './../cyril.png'
import Bruno from'./../bruno.png'
import Steven from './../captain.png'
import Jacqueline from './../oresama.png'
import Kévin from './../kevin.png'
import Flo from './../flo.png'
import Mel from './../mel.png'
import Barbara from './../barbara.png'

import './Carousel.css';

class Carousel extends Component {
  render() {
    return (
      <div id='fighter'>
        <h2>&lt; Choisis ton combattant &gt;</h2>

        <div id='slider'>
          
          <section id='section1'>

            <a id='leftOne' href='#section2'><i className="fas fa-arrow-circle-left"></i></a> 
            
            <div id='one' className='avatars'>
              <p className='sentences'>“C’est au pied du mur qu’on le voit le mieux.“</p>
              <img className='images' id='cyril' src={Cyril} alt='Avatar de Cyril'/>
              <p className='names'>Cyril</p>
            </div>

            <div id='two'className='avatars'>
              <p className='sentences'>"J'ai faim."</p>
              <img className='images' id='bruno' src={Bruno} alt='Avatar de Bruno' />
              <p className='names'>Bruno</p>
            </div>

            <div id='three' className='avatars'>
              <p className='sentences'>"J'apprécie les fruits au sirop."</p>
              <img className='images' id='kévin' src={Kévin} alt='Avatar de Kévin' />
              <p className='names'>Kévin</p>
            </div>

            <div id='four' className='avatars'>
              <p className='sentences'>"Le plus important, ce ne sont pas les moyens mais la finalité."</p>
              <img className='images' id='Jacqueline' src={Jacqueline} alt='Avatar de Jacqueline'/>
              <p className='names'>Jacqueline</p>
            </div>

            <a id='rightOne' href='#section2'><i className="fas fa-arrow-circle-right"></i></a>

          </section>

          <section id='section2'>

            <a id='leftTwo' href='#section1'><i className="fas fa-arrow-circle-left"></i></a>

            <div id='five' className='avatars'>
              <p className='sentences'>"Un ours mal léché qui préfère rester chez lui."</p>
              <img className='images' id='steven' src={Steven} alt='Avatar de Steven' />
              <p className='names'>Steven</p>
            </div>

            <div id='six' className='avatars'>
              <p className='sentences'>"Moi, tu sais, je suis c**."</p>
              <img className='images' id='flo' src={Flo} alt='Avatar de Flo' />
              <p className='names'>Flo</p>
            </div>

            <div id='seven' className='avatars'>
              <p className='sentences'>"See you Space Cowboy."</p>
              <img className='images' id='mel' src={Mel} alt='Avatar de Mel' />
              <p className='names'>Mel</p>
            </div>

            <div id='eight' className='avatars'>
              <p className='sentences'>"L'ota court toujours."</p>
              <img className='images' id='barbara' src={Barbara} alt='Avatar de Barbara' />
              <p className='names'>Barbara</p>
            </div>

            <a id='rightTwo' href='#section1'><i className="fas fa-arrow-circle-right"></i></a>

          </section>

        </div>
      </div>
    )
  }
}

export default Carousel;