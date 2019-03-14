<template>
  <div class="weather-app">

    <ul :class="['cities-dropdown', {active: isDropdownActive}]">
      <li class="dropdown-btn">
        <div @click="dropDownBtnClicked">
          <span>{{ selectedCity }}</span>
          <MaterialSpinner :isLoading="isLoading"/>
        </div>
      </li>
      <li>
        <ul class="cities-list">
          <li v-for="(city, index) in cities" @click="itemListCkicked(city.city)" :key="index">
            {{city.city}}
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li :class="['current-weather', {active : !isDropdownActive}]" v-if="weatherToday">
        <ul>
          <li class="current-day">
            {{ moment(weatherToday.dt_txt).format('dddd') }}<br/>
            <span>( Aujourd'hui )</span>
          </li>
          <li><img class="icon" :src="'http://openweathermap.org/img/w/' + weatherToday.weather[0].icon + '.png'" alt=""></li>
          <li>{{ Math.round(weatherToday.main.temp) }} °</li>
        </ul>
      </li>
      <li v-if="forecast">
        <ul :class="['forecast', {active : !isDropdownActive}]">
          <li
            v-for="(forecast, index) in forecast.list"
            :key="index"
            v-if="( moment(forecast.dt_txt).get('hour') === 9 ||
                    moment(forecast.dt_txt).get('hour') === 15 ) &&
                    moment(forecast.dt_txt).format('dd') !== moment().format('dd')" >
            <ul>
              <li
                v-if="moment(forecast.dt_txt).get('hour') === 9" class="forecast-day" >
                {{ moment(forecast.dt_txt).format('dddd') }}
              </li>
              <li v-else class="hidden">null</li>
            </ul>
            <ul>
              <li>{{ moment(forecast.dt_txt).format('HH:mm')}}</li>
              <li>
                <img class="icon" :src="'http://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png'" alt="">
              </li>
              <li>{{ Math.round(forecast.main.temp) }} °</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
import fetch from 'cross-fetch';
import MaterialSpinner from '@/components/MaterialSpinner'
import * as moment from 'moment'
moment.locale('fr')

export default {
  components: {
    MaterialSpinner
  },
  data () {
    return {
      cities: [],
      selectedCity: 'Selectionner une ville',
      isDropdownActive: false,
      isLoading: true,
      weatherToday: null,
      forecast: null
    }
  },
  created () {
    this.isLoading = false
  },
  methods: {
      moment: function (dt) {
        return moment(dt);
      },
      dropDownBtnClicked () {
        // dowload cities list
        (async () => {
          try {
            const res = await fetch('/static/json/cities-fr.json', {
              method: 'GET'
            })

            if (res.status >= 400) {
              throw new Error("Bad response from server");
            }
            this.isDropdownActive ? this.isDropdownActive = false : this.isDropdownActive = true
            this.isLoading = true
            const data = await res.json();
            data.map((data) => {
              this.cities = [
                ...this.cities,
                data
                ]
            })
            setTimeout(() => {
              this.isLoading = false
            }, 1000)
          } catch (err) {
            console.error(err);
          }
        })();
      },
      itemListCkicked (name) {
        // download current weather
        (async () => {
          try {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name},fr&units=metric&APPID=134185b89eed9a154a0f95dfcfdee7bf`, {
              method: 'GET'
            })
            if (res.status >= 400) {
              throw new Error("Bad response from server");
            }
            this.isDropdownActive = false
            this.isLoading = true
            this.selectedCity = name
            const data = await res.json();
            this.weatherToday = data
            setTimeout(() => {
              this.isLoading = false
            }, 1000)
          } catch (err) {
            console.error(err);
          }
        })();
        // download forecast
        (async () => {
          try {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&APPID=134185b89eed9a154a0f95dfcfdee7bf`, {
              method: 'GET'
            })
            if (res.status >= 400) {
              throw new Error("Bad response from server");
            }
            const data = await res.json();
            this.forecast = data
          } catch (err) {
            console.error(err);
          }
        })();
      }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/* eslint-disable */
$transparency: #5b2d89;
$activeTransparency: #51287a;

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background-color: $transparency;
}
::-webkit-scrollbar-thumb {
  background-color: $transparency;
}

ul, li{
  list-style-type: none;
  padding: 0;
}


.weather-app{
  position: relative;
  max-width: 600px;
  margin: 3rem auto;
  background: rebeccapurple;
  color: #ffffff;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 780px){
    box-shadow: none;
  }
  @media screen and (max-width: 621px){
    margin: 0;
  }
  > ul{
    display: flex;
    flex:1;
    flex-direction: column;
    li{
      flex: 1;
      padding: .5rem;
    }
  }
  .cities-dropdown{
    display:flex;
    .dropdown-btn {
      font-weight: normal;
      font-size: 2.3rem;
      cursor:pointer;
      margin: -1rem .5rem;
      padding: 1rem;
      transition: letter-spacing 500ms linear;
      &:hover{
        letter-spacing: 1.2px;
      }
      &:active{
        letter-spacing: .5px;
      }
      @media screen and (max-width: 621px){
        font-size: 1.5rem;
      }
    }
    &.active{
      .cities-list{
        display: flex;
        height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        transition: height 500ms linear;

      }
    }
    .cities-list{
      height: 0;
      overflow: hidden;
      transition: none;
      flex-direction: column;

      li{
        cursor:pointer;
        text-align: left;
        padding: 1rem;
        text-transform: lowercase;
        transition: all 150ms linear;
        &:first-letter{
          text-transform: capitalize;
        }
        &:hover{
          background: $transparency;
          letter-spacing: 1.2px
        }
        &:active{
          background: $activeTransparency;
          letter-spacing: .5px
        }
      }

    }
  }

  .icon{
    width: 60px;
    height: 60px;
  }

  .current-weather{
    display: none;
    text-align: left;
    font-size: 2rem;
    border-bottom: 2px solid $transparency;
    border-top: 2px solid $transparency;
    margin: 1rem 0;
    @media screen and (max-width: 680px){
      font-size: 1.3rem;
      border-bottom: 0;
    }
    &.active{
      display:block;
    }
    ul{
      display: flex;
      align-items: center;
      text-align: center;
      @media screen and (max-width: 680px){
        flex-direction: column;

      }
      li{
        border: 2px solid #5b2d89;
        border-top: 0;
        border-bottom: 0;
        &:first-child{
          border: 0;
        }
        &:last-child{
          border: 0;
        }
        @media screen and (max-width: 680px){
          border: 0;
        }
      }
    }
    .current-day{
      text-transform: capitalize;
      span{
        font-size: 14px;
      }
      @media screen and (max-width: 680px){
        padding-bottom: 1.5rem;
        br{
          display: none;
        }
        &:first-child{
          border-bottom: 2px solid $transparency;
          width: 100%;
        }
      }

    }
  }


  .forecast{
    margin: -1rem;
    display: flex;
    background: rebeccapurple;
    color:#ffffff;
    height: 0;
    overflow: hidden;
    &.active{
      height: auto;
    }
    @media screen and (max-width: 680px){
      flex-wrap: wrap;
      max-height: 756px;
      li{
        min-width: calc(50% - 2rem)
      }
    }
    .forecast-day{
      width: calc(200% + 1rem + 2px);
      text-transform: capitalize;
      border-bottom: 2px solid #5b2d89;
      padding-bottom: 2rem;
      margin-bottom: 2rem;
      @media screen and (max-width: 680px){
        padding-top: 1.5rem;
        border-top: 2px solid #5b2d89;
      }
    }
    li{
      flex: 1;
      min-width: calc(16.6666666667% - 1rem - 2px);
      @media screen and (max-width: 680px){
        min-width: calc(50% - 1rem - 2px);
      }
      > ul{
        &:nth-child(even){
          border-left: 2px solid #5b2d89;
          @media screen and (max-width: 680px){
            border: 0;
          }
        }
        > *{
          display: block;
          text-align: center;
          &.hidden{
            opacity: 0;
            padding-bottom: 2rem;
            margin-bottom: 2rem;
            @media screen and (max-width: 680px){
              padding-top: 1.5rem;
            }
          }
        }
      }
    }

  }
}

</style>
