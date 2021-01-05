import React, {useEffect, useState} from "react"
import Base from "../core/Base.js"
import { Card } from "../core/Card.js";
import { FeedContent } from "../core/FeedContent.js";

// import "../styles.css";

export default function Profile() {



  

  return (
<div>
  <Base>
    <div className="row py-4" style={{paddingRight:"10px", paddingLeft:"10px"}}>
     <div className="col-lg-3">
       <img className="rounded-circle" style={{width: "50%", marginTop:"10px"}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="profile"/>
     </div>
     <div className="col-lg-9" style={{textAlign:"left", marginTop:"10px"}}>
       <h2 className="text-bold" style={{fontWeight:"bold"}}>Name</h2>
       <h3>Location &nbsp; &nbsp; &nbsp; Followers</h3>
       <h3>Bio</h3>
       <h3>Investment Age</h3>
       <h3>Industry Exp</h3>
     </div>
    </div>
    <section>
      <ul class="nav nav-tabs" id="myTab" role="tablist" style={{padding:"0px 30px"}}>
        <li class="nav-item">
          <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Posts</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="portfolio-tab" data-toggle="tab" href="#portfolio" role="tab" aria-controls="portfolio" aria-selected="false">Portfolio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="groups-tab" data-toggle="tab" href="#groups" role="tab" aria-controls="groups" aria-selected="false">Groups</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="activity-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false">Activity</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent" style={{padding:"0px 30px"}}>
        <div class="tab-pane fade active show text-center" id="posts" role="tabpanel" aria-labelledby="posts-tab" style={{marginTop:"20px"}}>
        <Card class="card mb-5">
       <FeedContent
       avatarImage="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
       cardTitle='Test Card'
       cardDescription='Just of Testing'
        cardText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " />
     </Card>
     <Card class="card mb-5">
       <FeedContent
       avatarImage="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
       cardTitle='Test Card'
       cardDescription='Just of Testing'
        cardText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " />
     </Card>
     
        </div>
        <div class="tab-pane fade" id="portfolio" role="tabpanel" aria-labelledby="portfolio-tab">Food truck fixie
          locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog
          sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo
          booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo
          nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero
          magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean
          shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher
          vero sint qui sapiente accusamus tattooed echo park.</div>
        <div class="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="groups-tab">Etsy mixtape wayfarers,
          ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi
          farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore
          carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred
          pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk
          vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork
          sustainable tofu synth chambray yr.</div>
        <div class="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">Etsy mixtape wayfarers,
          ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi
          farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore
          carles etsy salvia banksy hoodie helvetica.</div>
      </div>

    </section>
  </Base>
</div>
  );
}