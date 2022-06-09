import "./App.less";
import "ol/ol.css";
import React, { useState, useRef, useEffect } from "react";
import OSM from "ol/source/OSM";
import Map from "ol/Map";
import View from "ol/View";
import { transform } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileDebug from "ol/source/TileDebug";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import XYZ from "ol/source/XYZ";
import Draw from "ol/interaction/Draw";
import * as olControl from "ol/control";
import { Style, Circle, Fill, Stroke } from "ol/style";

function App() {
  const [coordinate, setCoordinate] = useState("请画线"); //画线的坐标集合
  const [toolLayer, setToolLayer] = useState({});
  const [mapList, setMapList] = useState({});
  useEffect(() => {
    loadMap();
  }, []);
  var alllay;
  var osmSource = new OSM();
  var lineDraw;
  const loadMap = () => {
    var map1 = new Map({
      view: new View({
        extent: [118.6, 27.2, 120.6, 29.2],
        center: transform([119.61028, 28.20652], "EPSG:4326", "EPSG:3857"),
        projection: "EPSG:4326",
        zoom: 7,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map1",
    });

    var map2 = new Map({
      logo: false,
      view: new View({
        center: [119.61028, 28.20652],
        projection: "EPSG:4326",
        zoom: 10,
        maxZoom: 11,
        minZoom: 9,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map2",
    });

    var view = new View({
      center: [119.61028, 28.20652],
      projection: "EPSG:4326",
      zoom: 10,
    });
    var map3 = new Map({
      view,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map3",
    });
    var map4 = new Map({
      view,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          }),
        }),
      ],
      target: "map4",
    });

    mapList.map5 = new Map({
      view: new View({
        center: [0, 0],
        projection: "EPSG:4326",
        zoom: 3,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map5",
    });
    mapList.map6 = new Map({
      view: new View({
        center: [119.61028, 28.20652],
        projection: "EPSG:4326",
        zoom: 8,
      }),
      layers: [
        new TileLayer({
          source: osmSource,
        }),
        new TileLayer({
          source: new TileDebug({
            projection: "EPSG:3857",
            tileGrid: osmSource.getTileGrid(),
          }),
        }),
      ],
      target: "map6",
    });
    // 创建map7的三个图层
    var osmLayer = new TileLayer({
      source: new OSM(),
      zIndex: 0,
    });
    var pointLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 0,
    });
    var circleLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 0,
    });
    // map7alllaymap8
    mapList.map7 = new Map({
      view: new View({
        center: [119.61028, 28.20652],
        projection: "EPSG:4326",
        zoom: 8,
      }),
      layers: [osmLayer, pointLayer, circleLayer],
      target: "map7",
    });
    // 添加点
    var point = new Feature({
      geometry: new Point([119.61028, 28.20652]),
    });
    point.setStyle(
      new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: "red",
          }),
          stroke: new Stroke({
            color: "red",
            size: 1,
          }),
        }),
      })
    );
    pointLayer.getSource().addFeature(point);
    // 添加圆
    var circle = new Feature({
      geometry: new Point([119.61028, 28.20652]),
    });
    circle.setStyle(
      new Style({
        image: new Circle({
          radius: 20,
          stroke: new Stroke({ color: "blue", size: 1 }),
        }),
      })
    );
    circleLayer.getSource().addFeature(circle);
    alllay = mapList.map7.getAllLayers();
    mapList.map8 = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          }),
        }),
      ],
      view: new View({
        center: [119.920701113613, 28.464831926462],
        projection: "EPSG:4326",
        zoom: 14,
      }),
      target: "map8",
    });
    toolLayer.Line = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        stroke: new Stroke({
          color: "red",
          size: 1,
        }),
      }),
    });
    lineDraw = new Draw({
      type: "LineString",
      source: toolLayer.Line.getSource(), //注意设置source,这样绘制好的线，就会添加到这个source里
      maxPoints: 5,
    });
    // 绘线结束的监听
    lineDraw.on("drawend", event => {
      setCoordinate(JSON.stringify(event.feature.getGeometry().getCoordinates()));
    });
    var map9 = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          }),
        }),
      ],
      view: new View({
        center: [119.920701113613, 28.464831926462],
        projection: "EPSG:4326",
        zoom: 14,
      }),
      // ol.control.Attribution: 右下角的地图信息控件
      // ol.control.FullScreen: 全屏控件
      // ol.control.MousePosition: 鼠标位置控件
      // ol.control.OverviewMap: 鸟瞰图控件
      // ol.control.Rotate: 指北针控件
      // ol.control.ScaleLine: 比例尺控件
      // ol.control.Zoom: 缩放按钮控件
      // ol.control.ZoomSlider: 缩放滚动条控件
      // ol.control.ZoomToExtent: 放大到设定区域控件
      controls: olControl
        .defaults({
          attribution: false,
          rotate: false,
          zoom: true,
        })
        .extend([
          new olControl.FullScreen(),
          new olControl.MousePosition(),
          new olControl.OverviewMap(),
          new olControl.ScaleLine(),
          new olControl.ZoomSlider(),
          new olControl.ZoomToExtent(),
        ]),
      target: "map9",
    });
  };

  // 交换地图
  const swapMap = () => {
    mapList.map5.values_.target == "map5"
      ? mapList.map5.setTarget("map6")
      : mapList.map5.setTarget("map5");
    mapList.map6.values_.target == "map6"
      ? mapList.map6.setTarget("map5")
      : mapList.map6.setTarget("map6");
  };

  // 向左移动地图
  const leftMoveMap = () => {
    var view = mapList.map6.getView();
    var mapCenter = view.getCenter();
    // 让地图中心的x值增加，即可使得地图向左移动，增加的值根据效果可自由设定
    mapCenter[0] += 5;
    view.setCenter(mapCenter);
    mapList.map6.render();
  };
  // 向右移动地图
  const rightMoveMap = () => {
    var view = mapList.map6.getView();
    var mapCenter = view.getCenter();
    // 让地图中心的x值增加，即可使得地图向左移动，增加的值根据效果可自由设定
    mapCenter[0] -= 5;
    view.setCenter(mapCenter);
    mapList.map6.render();
  };

  // 显示成都
  const fitToChengdu = () => {
    mapList.map5.getView().fit([104, 30.6, 104.12, 30.74], mapList.map5.getSize());
  };
  // 显示丽水
  const fitToLishui = () => {
    mapList.map5.getView().fit([119.89, 28.45, 119.95, 28.48], mapList.map5.getSize());
  };

  // 隐藏显示osm图层
  const checkOms = e => {
    // const alllay = map7.getAllLayers();
    alllay[0].setVisible(e);
  };
  // 隐藏显示point图层
  const checkPoint = e => {
    // const alllay = map7.getAllLayers();
    alllay[1].setVisible(e);
  };
  // 隐藏显示circle图层
  const heckCircle = e => {
    // const alllay = map7.getAllLayers();
    alllay[2].setVisible(e);
  };
  // 置顶osm图层到最上面
  const upOsm = e => {
    if (e) {
      alllay[0].setZIndex(3);
      alllay[1].setZIndex(alllay[1].getZIndex() - 1);
      alllay[2].setZIndex(alllay[2].getZIndex() - 1);
    }
  };
  // 置顶circle图层到最上面
  const upCircle = e => {
    if (e) {
      alllay[0].setZIndex(alllay[0].getZIndex() - 1);
      alllay[1].setZIndex(alllay[1].getZIndex() - 1);
      alllay[2].setZIndex(3);
    }
  };
  // 置顶point图层到最上面
  const upPoint = e => {
    if (e) {
      alllay[0].setZIndex(alllay[0].getZIndex() - 1);
      alllay[1].setZIndex(3);
      alllay[2].setZIndex(alllay[2].getZIndex() - 1);
    }
  };
  // 清除线 (可以用两种方法实现，一种是先获取所有集合数组再根据索引删除;一种是自定义一个图层集合对象然后删除)
  const removeLine = () => {
    // const allLay = map8.getAllLayers();
    // console.log(allLay);
    // allLay[1].getSource().clear();
    console.log(mapList.map8.getAllLayers()[1]);
    mapList.map8.getAllLayers()[1] && toolLayer.Line.getSource().clear();
    mapList.map8.getAllLayers()[1] && setCoordinate("暂无坐标");
  };
  const drawLine = () => {
    mapList.map8.addLayer(toolLayer.Line);
    mapList.map8.addInteraction(lineDraw);
  };

  return (
    <div className="App">
      <div className="mapall1">
        <h1>单页面多地图</h1>
        <p className="title">地图1（地图范围限制）</p>
        <div id="map1"></div>
        <p className="title">地图2（缩放层级限制）</p>
        <div id="map2"></div>
      </div>
      <div className="mapall2">
        <h1>地图联动</h1>
        <p className="title">地图3</p>
        <div id="map3"></div>
        <p className="title">地图4（高德卫星图）</p>
        <div id="map4"></div>
      </div>
      <div className="mapall3">
        <h1>动态交换地图</h1>
        <p
          style={{ display: "inline-block", marginRight: "50px", marginTop: "1px" }}
          className="title"
        >
          地图5
        </p>
        <button
          onClick={() => {
            swapMap();
          }}
        >
          交换地图
        </button>
        <button
          onClick={() => {
            fitToChengdu();
          }}
        >
          显示成都
        </button>
        <button
          onClick={() => {
            fitToLishui();
          }}
        >
          显示丽水
        </button>
        <div id="map5"></div>
        <p
          style={{ display: "inline-block", marginRight: "20px", marginTop: "1px" }}
          className="title"
        >
          地图6（瓦片坐标）
        </p>
        <button
          onClick={() => {
            leftMoveMap();
          }}
        >
          向左移动
        </button>
        <button
          onClick={() => {
            rightMoveMap();
          }}
        >
          向右移动
        </button>
        <div id="map6"></div>
      </div>
      <div className="mapall4">
        <h1>矢量地图图层叠加</h1>
        <p
          style={{ display: "inline-block", marginRight: "30px", marginTop: "1px" }}
          className="title"
        >
          地图7
        </p>
        <div style={{ display: "inline-block" }}>
          显示/隐藏：
          <input
            type="checkbox"
            defaultChecked
            onClick={e => {
              checkOms(e.target.checked);
            }}
          />
          底图
          <input type="checkbox" defaultChecked onClick={e => heckCircle(e.target.checked)} />圆
          <input type="checkbox" defaultChecked onClick={e => checkPoint(e.target.checked)} />点
        </div>
        <div>
          图层顺序：
          <input
            name="seq"
            type="radio"
            readOnly
            onClick={e => {
              upOsm(e);
            }}
          />
          底图最上
          <input
            name="seq"
            type="radio"
            defaultChecked
            readOnly
            onClick={e => {
              upCircle(e);
            }}
          />
          圆最上
          <input
            name="seq"
            type="radio"
            readOnly
            onClick={e => {
              upPoint(e);
            }}
          />
          点最上
        </div>
        <div id="map7"></div>
        <p
          className="title"
          style={{ display: "inline-block", marginRight: "30px", marginTop: "1px" }}
        >
          地图8（画线）
        </p>
        <button
          style={{ marginRight: "15px" }}
          onClick={() => {
            drawLine();
          }}
        >
          画线
        </button>
        <button
          onClick={() => {
            removeLine();
          }}
        >
          清空
        </button>
        <div>{`坐标：${coordinate}`}</div>
        <div id="map8"></div>
      </div>
      <div className="mapall5">
        <h1>地图控件</h1>
        <p
          style={{ display: "inline-block", marginRight: "30px", marginTop: "1px" }}
          className="title"
        >
          地图9
        </p>
        <div id="map9"></div>

        <div className="introduce">
          <p
            className="title"
            style={{ display: "inline-block", marginRight: "30px", marginTop: "1px" }}
          >
            控件介绍：
          </p>
          <h5>ol.control.Attribution: 右下角的地图信息控件</h5>
          <h5>ol.control.FullScreen: 全屏控件</h5>
          <h5>ol.control.MousePosition: 鼠标位置控件</h5>
          <h5>ol.control.OverviewMap: 鸟瞰图控件</h5>
          <h5>ol.control.Rotate: 指北针控件</h5>
          <h5>ol.control.ScaleLine: 比例尺控件</h5>
          <h5>ol.control.Zoom: 缩放按钮控件</h5>
          <h5>ol.control.ZoomSlider: 缩放滚动条控件</h5>
          <h5>ol.control.ZoomToExtent: 放大到设定区域控件</h5>
        </div>
      </div>
      <div style={{ marginLeft: "50px", marginTop: "80px" }}>
        此demo仅为练手项目，本页面的所有地图及其交互方法全部系本人独立完成。
      </div>
    </div>
  );
}

export default App;
