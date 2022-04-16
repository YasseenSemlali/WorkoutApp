from flask import Flask, render_template, request, jsonify, make_response
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
                         {'yaxis.title':'Distance (km)'},
                         # 3. which traces are affected
                         [0, 1],

                     ],
                     'args2': [
                         # 1. updates to the traces
                         {'y': [y_miles],
                          'visible': True},
                         # 2. updates to the layout
                         {'yaxis.title':'Distance (miles)'},
                         # 3. which traces are affected
                         [0, 1]
                     ]
                     },
                    ],
        'type': 'buttons',
        'direction': 'down',
        'showactive': True, }]
    fig.update_layout(updatemenus=updatemenus)

    return fig.to_html()


@app.route('/moving_avg')
def moving_avg():
    # default values

    with open('workouts.json') as json_file:
        data = json.load(json_file)
        df = pd.DataFrame.from_dict(data)
    # df=pd.read_csv("data.csv")
    n = 5

    date1 = pd.to_datetime(df["startTime"].iloc[0])
    date2 = pd.to_datetime(df["startTime"].iloc[-1])
    if 'window' in request.args and request.args['window'] != '':
        n = int(request.args['window'])

    if 'date1' in request.args and request.args['date1'] != '':
        date1 = (request.args['date1'])

    if 'date2' in request.args and request.args['date2'] != '':
        date2 = (request.args['date2'])

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
    current_elev_ft = 700
    current_elev_mt = current_elev_ft * 0.3048
    num = 1;

    with open('workouts.json') as json_file:
        data = json.load(json_file)
        df = pd.DataFrame.from_dict(data)
        df_ft = pd.DataFrame.from_dict(data)
        df_meters = pd.DataFrame.from_dict(data)

    foo = pd.DataFrame.from_dict(df_meters.iloc[-1].elevations)


    values = foo.ele


    fig = go.Figure()

    # initial fig with meters by default
    i = 0
    # distance
    z = 0
    while i < len(values) - 1:
        if (values[i]) > (values[i + 1]):
            fig.add_trace(go.Scatter(x=[z, z + 5 - 0.2],
                                     y=[int(values[i]) + current_elev_mt, int(values[i + 1]) + current_elev_mt],
                                     line_color='blue',
                                     fill='tozeroy',
                                     fillcolor='chartreuse'))
            i = i + 1
            z = z + 5

        elif (values[i]) == (values[i + 1]):
            fig.add_trace(go.Scatter(x=[z, z + 5 - 0.2],
                                     y=[int(values[i]) + current_elev_mt, int(values[i + 1]) + current_elev_mt],
                                     line_color='blue',
                                     fill='tozeroy',
                                     fillcolor='cyan'))
            i = i + 1
            z = z + 5

        elif (values[i]) < (values[i + 1]):
            fig.add_trace(go.Scatter(x=[z, z + 5 - 0.2],
                                     y=[int(values[i]) + current_elev_mt, int(values[i + 1]) + current_elev_mt],
                                     line_color='blue',
                                     fill='tozeroy',
                                     fillcolor='lightcoral'))
            i = i + 1
            z = z + 5


    #hiding trace legend
    fig.update_layout(showlegend=False)
    y_min = float(values.min())
    y_min = int(y_min)+int(current_elev_mt)
    y_max = float(values.max())
    y_max = int(y_max)+int(current_elev_mt)
    x_max = z
    fig.update_layout(title_text="Elevation / Ride Intensity",
                      title_x=0.5,
                      xaxis=dict(range=[-10 , x_max+10],
                                 title='distance traveled [meters]',
                                 titlefont_size=15,
                                 tickfont_size=15),
                      yaxis=dict(range=[y_min-20, int(y_max) + 20],
                                 title='elevation [meters]',
                                 titlefont_size=15,
                                 tickfont_size=15))

    return fig.to_html()


@app.route('/workouts')
def workouts():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    with open('workouts.json') as json_file:
        data = json.load(json_file)

        return _corsify_actual_response(jsonify(data))


#
def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    app.run(debug=True)
