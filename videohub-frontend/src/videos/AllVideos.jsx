import React, { useEffect, useState } from 'react';
import { Container, Button, Header, ButtonGroup, Icon, Image, Grid, GridColumn, GridRow, Segment, Label } from 'semantic-ui-react';
import { Card } from 'semantic-ui-react'
import HeaderPage from '../components/Header';
import { requestHelper } from '../requests/helpers/requestHelper';

import "./AllVideos.css";



export default function AllVideos(props) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        requestHelper("get", "/api/videos").then((res) => {
            setVideos(res.data.content)
        })
    }, [])

    return (
        <div className="App">
            <Container>
                <HeaderPage currentTab="videos" header="Все видео" />
                <Header as='h1' textAlign='center' inverted>Все видео</Header>

                <Header as={"p"} textAlign='left' inverted>Сортировка:</Header>
                <ButtonGroup icon>
                    <Button>
                        <Icon name='favorite' />
                        {" "}Новое
                    </Button>
                    <Button>
                        <Icon name='eye' />
                        {" "}По просмотрам
                    </Button>
                    <Button>
                        <Icon name='thumbs up' />
                        {" "}По лайкам
                    </Button>
                </ButtonGroup>

                <br />

                {/* <Image fluid size='big' centered src="http://localhost:8080/media/anime.gif" /> */}
                <Card.Group itemsPerRow={3} >
                    {videos?.map((el) => (
                        <Card color='orange' className='vidCard'>
                            <Label className='vidCardText' attached='bottom'>
                                <Grid>
                                    <GridColumn className='vidCardText' textAlign="left" width={10}>
                                        {el.name}
                                    </GridColumn>
                                    <GridColumn textAlign='right' width={6}>
                                        12:22 30к
                                    </GridColumn>
                                </Grid>
                            </Label>
                            <Image className='imageCard' src="http://localhost:8080/media/3eb0c1df-acbb-445a-b9b6-022566d0dbb9.png" />

                        </Card>
                    ))}
                    <Card color='orange' className='vidCard'>
                        <Label className='vidCardText' attached='bottom'>
                            <Grid>
                                <GridColumn className='vidCardText' textAlign="left" width={10}>
                                    сосет хуй хуй хуй хуй хуй
                                </GridColumn>
                                <GridColumn textAlign='right' width={6}>
                                    12:22 30к
                                </GridColumn>
                            </Grid>
                        </Label>
                        <Image className='imageCard' src="http://localhost:8080/media/c94334f4-3be4-41ba-9538-21a22adc5d0a.png" />

                    </Card>
                    <Card color='orange' className='vidCard'>
                        <Label className='vidCardText' attached='bottom'>
                            <Grid>
                                <GridColumn className='vidCardText' textAlign="left" width={10}>
                                    сосет хуй хуй хуй хуй хуй
                                </GridColumn>
                                <GridColumn textAlign='right' width={6}>
                                    12:22 30к
                                </GridColumn>
                            </Grid>
                        </Label>
                        <Image className='imageCard' src="http://localhost:8080/media/avatar.png" />

                    </Card>
                </Card.Group>
            </Container>

        </div>

    )
}

