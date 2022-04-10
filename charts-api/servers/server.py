from flask import Flask, render_template, request
import plotly.graph_objects as go
import chart_studio
import chart_studio.plotly as py
import chart_studio.tools as tls
import pandas as pd
import json
import plotly


'''
Web Visualization with Plotly and Flask:
https://towardsdatascience.com/web-visualization-with-plotly-and-flask-3660abf9c946
'''
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/activity_recap')
def activity_recap():
    # Load data
  with open('workouts.json') as json_file:
    data = json.load(json_file)
    df = pd.DataFrame.from_dict(data)

  # df = pd.read_csv("data.csv")

  # Create figure
  fig = go.Figure()

  y_miles = df.distance
  y_km = df.distance * 1.60934

  fig.add_trace(
      go.Bar(x=df.startTime, y=y_miles, marker_color='indianred'))

  # Set title
  fig.update_layout(
      title_text="Activity Recap",
      title_x=0.5
  )

  # Add range slider
  fig.update_layout(
      yaxis=dict(
          title='Distance',
          titlefont_size=16,
          tickfont_size=14,
      ),
      xaxis=dict(
          rangeselector=dict(
              buttons=list([
                  dict(count=7,
                       label="WEEK",
                       step="day",
                       stepmode="backward"),
                  dict(count=1,
                       label="MONTH",
                       step="month",
                       stepmode="backward"),

                  dict(count=1,
                       label="YEAR",
                       step="year",
                       stepmode="backward"),
                  dict(label="ALL",
                       step="all")
              ])
          ),
          rangeslider=dict(
              visible=False
          ),
          type="date"
      )
  )

  # https://stackoverflow.com/a/68899741
  updatemenus = [{
                  'buttons': [{'method': 'update',
                               'label': 'Km/Miles',
                               'args': [
                                        # 1. updates to the traces
                                        {'y': [y_km],
                                         'visible': True},
                                         # 2. updates to the layout
                                        {'yaxis_title_text':'Distance (km)'},
                                        # 3. which traces are affected 
                                        [0, 1],
                                        
                                        ],
                               'args2': [
                                         # 1. updates to the traces  
                                         {'y': [y_miles],
                                         'visible':True},
                                         # 2. updates to the layout
                                        {'yaxis_title_text':'Distance (miles)'},
                                         # 3. which traces are affected
                                         [0, 1]
                                        ]
                                },
                              ],
                  'type':'buttons',
                  'direction': 'down',
                  'showactive': True,}]
  fig.update_layout(updatemenus=updatemenus)

  return fig.to_html()


@app.route('/moving_avg', methods=['POST', 'GET'])
def moving_avg():
  # default values

  with open('workouts.json') as json_file:
    data = json.load(json_file)
    df = pd.DataFrame.from_dict(data)
  # df=pd.read_csv("data.csv")
  n = 5
  
  date1 = pd.to_datetime(df["startTime"].iloc[0])
  date2 = pd.to_datetime(df["startTime"].iloc[-1])
  if request.method == 'POST':
    n = int(request.form['window'])
    date1 = request.form['date1']
    date2 = request.form['date2']

  
  df["moveAvg"] = df["distance"].rolling(n).mean()

  df['startTime'] = pd.to_datetime(df['startTime'])
  df.sort_values(by='startTime', inplace=True)
  selected_dates = (df['startTime'] >= date1) & (df['startTime'] <= date2)
  df = df.loc[selected_dates]

  fig = go.Figure([go.Scatter(x=df['startTime'], y=df['moveAvg'])])

  fig.update_layout(
    title_text="Moving Average",
    title_x=0.5,
    yaxis=dict(
    title='km/hr',
    titlefont_size=16,
    tickfont_size=14))

  return fig.to_html()

@app.route('/elevation')
def elevation():
    num = 1;

    df = pd.read_csv("elevation.csv")
    df_ft = pd.read_csv("elevation.csv")
    df_meters = pd.read_csv("elevation.csv")
    df_meters['Value'] = df_meters['Value'].apply(lambda y: y * 0.3048)
    df_meters['Distance'] = df_meters['Distance'].apply(lambda x: x * 0.3048)

    def mul(int):
        if int == 0:
            df = df_meters
        elif int == 1:
            df = df_ft

    fig = go.Figure()

    '''
    # WORKING raw display
    #df = df.WorkoutID.eq(num)
    #fig = go.Figure([go.Scatter(x=df["Distance"], y=df["Value"])])
    '''

    # df_temp = df[df.WorkoutID.eq(num)]
    # simple line
    # fig = go.Figure([go.Scatter(x=df.Distance.filter(df.WorkoutID.eq(num)), y=df.Value.filter(df.WorkoutID.eq(num)))])

    # fig = go.Figure([go.Scatter(x=df.loc[df.WorkoutID == num]['Distance'],
    #                            y=df.loc[df.WorkoutID == num]['Value'])])

    # initial fig with meters by default
    i = 0
    # fig.data = []
    for v in df_meters.loc[df_meters.WorkoutID == num]['Value']:
        if i < len(df_meters.loc[df_meters.WorkoutID == num]) - 1:
            if (df_meters.loc[df_meters.WorkoutID == num]['Value'][i]) > (
                    df_meters.loc[df_meters.WorkoutID == num]['Value'][i + 1]):
                fig.add_trace(go.Scatter(x=[df_meters.loc[df_meters.WorkoutID == num]['Distance'][i],
                                            df_meters.loc[df_meters.WorkoutID == num]['Distance'][i + 1] - 0.2],
                                         y=[df_meters.loc[df_meters.WorkoutID == num]['Value'][i],
                                            df_meters.loc[df_meters.WorkoutID == num]['Value'][i + 1]],
                                         line_color='blue',
                                         fill='tozeroy',
                                         fillcolor='chartreuse'))
                i = i + 1
            elif (df_meters.loc[df_meters.WorkoutID == num]['Value'][i]) == (
                    df_meters.loc[df_meters.WorkoutID == num]['Value'][i + 1]):
                fig.add_trace(go.Scatter(x=[df_meters.loc[df_meters.WorkoutID == num]['Distance'][i],
                                            df_meters.loc[df_meters.WorkoutID == num]['Distance'][i + 1] - 0.2],
                                         y=[df_meters.loc[df_meters.WorkoutID == num]['Value'][i],
                                            df_meters.loc[df_meters.WorkoutID == num]['Value'][i + 1]],
                                         line_color='blue',
                                         fill='tozeroy',
                                         fillcolor='cyan'))
                i = i + 1

            elif (df_meters.loc[df_meters.WorkoutID == num]['Value'][i]) < (
                    df_meters.loc[df_meters.WorkoutID == num]['Value'][i + 1]):
                fig.add_trace(go.Scatter(x=[df_meters.loc[df_meters.WorkoutID == num]['Distance'][i],
                                            df_meters.loc[df_meters.WorkoutID == num]['Distance'][i + 1] - 0.2],
                                         y=[df_meters.loc[df_meters.WorkoutID == num]['Value'][i],
                                            df_meters.loc[df_meters.WorkoutID == num]['Value'][i + 1]],
                                         line_color='blue',
                                         fill='tozeroy',
                                         fillcolor='lightcoral'))
                i = i + 1

    # hiding trace legend
    # fig.update_layout(showlegend=False)
    y_min = df_meters.loc[df_meters.WorkoutID == num]['Value'].min() - 20 * 0.3048
    y_max = df_meters.loc[df_meters.WorkoutID == num]['Value'].max() + 20 * 0.3048
    x_max = df_meters.loc[df_meters.WorkoutID == num]['Distance'].max() + 5 * 0.3048
    fig.update_layout(title_text="Elevation / Ride Intensity",
                      title_x=0.5,
                      xaxis=dict(range=[-5 * 0.3048, x_max],
                                 title='distance traveled [meters]',
                                 titlefont_size=15,
                                 tickfont_size=15),
                      yaxis=dict(range=[y_min, y_max],
                                 title='elevation [meters]',
                                 titlefont_size=15,
                                 tickfont_size=15))

    return fig.to_html()


if __name__ == '__main__':
  app.run(debug=True)