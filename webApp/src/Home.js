import React, { useState } from 'react'
import {
    Form,
    Button,
    Layout,
    Typography,
    InputNumber,
    Popover
} from 'antd'

import axios from 'axios'


const { Header, Footer, Content } = Layout
const { Title } = Typography

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 12 },
    },
  }

  const categorieInfos = (
      <div className='row'>
        <div className='col-md-4'>1 - Book</div>
        <div className='col-md-4'>2 - Business</div>
        <div className='col-md-4'>3 - Catalogs</div>
        <div className='col-md-4'>4 - Education</div>
        <div className='col-md-4'>5 - Entertainement</div>
        <div className='col-md-4'>6 - Food &#38; Drink</div>
        <div className='col-md-4'>7 - Finances</div>
        <div className='col-md-4'>8 - Health</div>
        <div className='col-md-4'>9 - LifeStyle</div>
        <div className='col-md-4'>10 - Games</div>
        <div className='col-md-4'>11 - Photo &#38; </div>
        <div className='col-md-4'>12 - Productivity</div>
        <div className='col-md-4'>13 - SocialNetwork</div>
        <div className='col-md-4'>14 - Travel</div>
        <div className='col-md-4'>15 - News</div>
        <div className='col-md-4'>16 - Weather</div>
        <div className='col-md-4'>17 - Reference</div>
        <div className='col-md-4'>18 - Navigation</div>
        <div className='col-md-4'>19 - Medical</div>
        <div className='col-md-4'>20 - Utilities</div>
        <div className='col-md-4'>21 - Music</div>
        <div className='col-md-4'>22 - Shopping</div>
        <div className='col-md-4'>23 - Sports</div>
      </div>
  )

export default function Home(){

    const [prix, setPrix] = useState(0)
    const [nb_devices, setNbDevices] = useState(0)
    const [taille, setTaille] = useState(0)
    const [categorie, setCategorie] = useState('')
    const [nbLang, setNbLang] = useState(0)
    const [nbAvisTotal, setNbAvisTotal] = useState(0)

    const submit = (e) => {
        e.preventDefault()

        let data = {
            prix,
            nb_devices,
            taille,
            categorie,
            nbLang,
            nbAvisTotal
        }
        
        axios.post('http://localhost:5000/', data)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => { 
                console.log(error)
            })
    }

    return(
        <div className="container">
            <Layout>
                <Header>
                    <Typography>
                        <Title level={2} style={{color: 'gray'}}>MAS</Title>
                    </Typography>
                </Header>
                <Content style={{ marginLeft: 200, marginRight: 200}}>
                    <Typography>
                        <Title level={1}>Mobile App Store</Title>
                        <Title level={3}>Saisissez vos données et laissez notre application prédire le succès...</Title>
                    </Typography>

                    <Form {...formItemLayout}>
                        <Form.Item label="Prix *">
                        {(<InputNumber min={0} defaultValue={0} onChange={(value) => setPrix(value)} />)}
                        </Form.Item>
                        <Form.Item label="nombre d'appareils supportés *" hasFeedback>
                        {(<InputNumber min={1} onChange={(value) => setNbDevices(value)}/>)}
                        </Form.Item>
                        <Form.Item label="Taille *" hasFeedback>
                        {(<InputNumber onChange={(value) => setTaille(value)}/>)}
                        </Form.Item>
                        <Form.Item label="Catégorie *" hasFeedback>
                        {(<InputNumber min={1} max={23} onChange={(value) => setCategorie(value)} style={{marginRight: 10}}/>)}
                        <Popover content={categorieInfos} title="Catégorie Infos" trigger="hover">
                            <Button type="primary" shape="circle" icon="info" />
                        </Popover>
                        </Form.Item>
                        <Form.Item label="Nombre de langues *" hasFeedback>
                        {(<InputNumber min={0} onChange={(value) => setNbLang(value)}/>)}
                        </Form.Item>
                        <Form.Item label="Nombre d'avis total *" hasFeedback>
                        {(<InputNumber min={0} defaultValue={0} onChange={(value) => setNbAvisTotal(value)}/>)}
                        </Form.Item>
                    </Form>
                    <Button 
                        type="primary" 
                        icon="search" 
                        className="col-md-4"
                        onClick={submit}
                    >
                        Soumettre
                    </Button>
                </Content>
                <Footer style={{backgroundColor: 'black', marginTop: 50}}>
                    <div style={{color: 'white'}}>Mobile App Store copyright &copy; Thomas  &#38;  Mama</div>
                </Footer>
            </Layout>
        </div>
    )
}