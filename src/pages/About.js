import React from 'react'
import hero from '../assets/hero-bcg.jpeg'
import { PageHero } from '../components'
import styled from 'styled-components'

const About = () => {
  document.title = 'Comfy Sloth || ABOUT'
  return (
    <main>
      <PageHero title='about us' />
      <Wrapper className='page section section-center'>
        <img src={hero} alt='hero' />
        <article>
          <div className='title'>
            <h2>our story</h2>
            <div className='underline'></div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium quasi quas officia numquam asperiores, at sunt
              recusandae, placeat itaque, ipsum facere neque nihil labore.
              Veritatis nesciunt ex a quas deserunt excepturi beatae quisquam ut
              distinctio quod at omnis iure provident, ipsam perferendis!
              Deserunt, mollitia amet? Ipsa perspiciatis corporis incidunt
              provident harum quaerat deserunt quidem doloribus, laudantium illo
              qui dicta sed fugiat sunt cum fuga, ex nemo porro debitis quasi?
              Illo ratione laudantium sed expedita iure molestiae quis similique
              qui doloremque quaerat, rerum cumque ipsa odit consequuntur
              veritatis. Assumenda expedita nulla similique vero, cumque facere
              numquam quasi, non dolorem tempora officia? Voluptatum libero
              facere fugiat?
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default About
