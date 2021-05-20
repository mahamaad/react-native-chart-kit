var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import React, { Component } from "react";
import {
  Defs,
  Line,
  LinearGradient,
  Stop,
  Text,
  TSpan
} from "react-native-svg";
export var DEFAULT_X_LABELS_HEIGHT_PERCENTAGE = 0.75;
var AbstractChart = /** @class */ (function(_super) {
  __extends(AbstractChart, _super);
  function AbstractChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.calcScaler = function(data) {
      if (_this.props.fromZero) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [0])) -
            Math.min.apply(Math, __spreadArrays(data, [0])) || 1
        );
      } else if (_this.props.fromNumber) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [_this.props.fromNumber])) -
            Math.min.apply(
              Math,
              __spreadArrays(data, [_this.props.fromNumber])
            ) || 1
        );
      } else {
        return Math.max.apply(Math, data) - Math.min.apply(Math, data) || 1;
      }
    };
    _this.calcBaseHeight = function(data, height) {
      var min = Math.min.apply(Math, data);
      var max = Math.max.apply(Math, data);
      if (min >= 0 && max >= 0) {
        return height;
      } else if (min < 0 && max <= 0) {
        return 0;
      } else if (min < 0 && max > 0) {
        return (height * max) / _this.calcScaler(data);
      }
    };
    _this.calcHeight = function(val, data, height) {
      var max = Math.max.apply(Math, data);
      var min = Math.min.apply(Math, data);
      if (min < 0 && max > 0) {
        return height * (val / _this.calcScaler(data));
      } else if (min >= 0 && max >= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - min) / _this.calcScaler(data));
      } else if (min < 0 && max <= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - max) / _this.calcScaler(data));
      }
    };
    _this.renderHorizontalLines = function(config) {
      var count = config.count,
        width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      var basePosition = height * verticalLabelsHeightPercentage;
      return __spreadArrays(new Array(count + 1)).map(function(_, i) {
        var y = (basePosition / count) * i + paddingTop;
        return (
          <Line
            key={Math.random()}
            x1={paddingRight}
            y1={y}
            x2={width}
            y2={y}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderHorizontalLine = function(config) {
      var width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={height * verticalLabelsHeightPercentage + paddingTop}
          x2={width}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderHorizontalLabels = function(config) {
      var count = config.count,
        data = config.data,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.horizontalLabelRotation,
        horizontalLabelRotation = _a === void 0 ? 0 : _a,
        _b = config.decimalPlaces,
        decimalPlaces = _b === void 0 ? 2 : _b,
        _c = config.formatYLabel,
        formatYLabel =
          _c === void 0
            ? function(yLabel) {
                return yLabel;
              }
            : _c,
        _d = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _d === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _d;
      var _e = _this.props,
        _f = _e.yAxisLabel,
        yAxisLabel = _f === void 0 ? "" : _f,
        _g = _e.yAxisSuffix,
        yAxisSuffix = _g === void 0 ? "" : _g,
        _h = _e.yLabelsOffset,
        yLabelsOffset = _h === void 0 ? 12 : _h;
      return new Array(count === 1 ? 1 : count + 1).fill(1).map(function(_, i) {
        var yLabel = String(i * count);
        if (count === 1) {
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(data[0].toFixed(decimalPlaces)) +
            yAxisSuffix;
        } else {
          var label = _this.props.fromZero
            ? (_this.calcScaler(data) / count) * i +
              Math.min.apply(Math, __spreadArrays(data, [0]))
            : (_this.calcScaler(data) / count) * i + Math.min.apply(Math, data);
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(label.toFixed(decimalPlaces)) +
            yAxisSuffix;
        }
        var basePosition = height * verticalLabelsHeightPercentage;
        var x = paddingRight - yLabelsOffset;
        var y =
          count === 1 && _this.props.fromZero
            ? paddingTop + 4
            : height * verticalLabelsHeightPercentage -
              (basePosition / count) * i +
              paddingTop;
        return (
          <Text
            rotation={horizontalLabelRotation}
            origin={x + ", " + y}
            key={Math.random()}
            x={x}
            textAnchor="end"
            y={y}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForHorizontalLabels()}
          >
            {yLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLabels = function(_a) {
      var _b = _a.labels,
        labels = _b === void 0 ? [] : _b,
        width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        _c = _a.horizontalOffset,
        horizontalOffset = _c === void 0 ? 0 : _c,
        _d = _a.stackedBar,
        stackedBar = _d === void 0 ? false : _d,
        _e = _a.verticalLabelRotation,
        verticalLabelRotation = _e === void 0 ? 0 : _e,
        _f = _a.formatXLabel,
        formatXLabel =
          _f === void 0
            ? function(xLabel) {
                return xLabel;
              }
            : _f,
        _g = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _g === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _g;
      var _h = _this.props,
        _j = _h.xAxisLabel,
        xAxisLabel = _j === void 0 ? "" : _j,
        _k = _h.xLabelsOffset,
        xLabelsOffset = _k === void 0 ? 0 : _k,
        _l = _h.hidePointsAtIndex,
        hidePointsAtIndex = _l === void 0 ? [] : _l;
      var fontSize = 12;
      var fac = 1;
      if (stackedBar) {
        fac = 0.71;
      }
      return labels.map(function(label, i) {
        if (hidePointsAtIndex.includes(i)) {
          return null;
        }
        var x =
          (((width - paddingRight) / labels.length) * i +
            paddingRight +
            horizontalOffset) *
          fac;
        var y =
          height * verticalLabelsHeightPercentage +
          paddingTop +
          fontSize * 2 +
          xLabelsOffset;
        return (
          <Text key={Math.random()}>
            <TSpan
              origin={x + ", " + y}
              rotation={verticalLabelRotation}
              x={x}
              y={y}
              textAnchor={verticalLabelRotation === 0 ? "middle" : "start"}
              {..._this.getPropsForLabels()}
              {..._this.getPropsForVerticalLabels()}
            >
              {"" + formatXLabel(label) + xAxisLabel}
            </TSpan>
          </Text>
        );
      });
    };
    _this.renderVerticalLines = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      var _c = _this.props.yAxisInterval,
        yAxisInterval = _c === void 0 ? 1 : _c;
      return __spreadArrays(
        new Array(Math.ceil(data.length / yAxisInterval))
      ).map(function(_, i) {
        return (
          <Line
            key={Math.random()}
            x1={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y1={0}
            x2={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y2={height * verticalLabelsHeightPercentage + paddingTop}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderVerticalLine = function(_a) {
      var height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      return (
        <Line
          key={Math.random()}
          x1={Math.floor(paddingRight)}
          y1={0}
          x2={Math.floor(paddingRight)}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderDefs = function(config) {
      var width = config.width,
        height = config.height,
        backgroundGradientFrom = config.backgroundGradientFrom,
        backgroundGradientTo = config.backgroundGradientTo,
        useShadowColorFromDataset = config.useShadowColorFromDataset,
        data = config.data;
      var fromOpacity = config.hasOwnProperty("backgroundGradientFromOpacity")
        ? config.backgroundGradientFromOpacity
        : 1.0;
      var toOpacity = config.hasOwnProperty("backgroundGradientToOpacity")
        ? config.backgroundGradientToOpacity
        : 1.0;
      var fillShadowGradient = config.hasOwnProperty("fillShadowGradient")
        ? config.fillShadowGradient
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientOpacity = config.hasOwnProperty(
        "fillShadowGradientOpacity"
      )
        ? config.fillShadowGradientOpacity
        : 0.1;
      return (
        <Defs>
          <LinearGradient
            id="backgroundGradient"
            x1={0}
            y1={height}
            x2={width}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset="0"
              stopColor={backgroundGradientFrom}
              stopOpacity={fromOpacity}
            />
            <Stop
              offset="1"
              stopColor={backgroundGradientTo}
              stopOpacity={toOpacity}
            />
          </LinearGradient>
          {useShadowColorFromDataset ? (
            data.map(function(dataset, index) {
              return (
                <LinearGradient
                  id={"fillShadowGradient_" + index}
                  key={"" + index}
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={height}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop
                    offset="0"
                    stopColor={
                      dataset.color ? dataset.color(1.0) : fillShadowGradient
                    }
                    stopOpacity={fillShadowGradientOpacity}
                  />
                  <Stop
                    offset="1"
                    stopColor={
                      dataset.color
                        ? dataset.color(fillShadowGradientOpacity)
                        : fillShadowGradient
                    }
                    stopOpacity="0"
                  />
                </LinearGradient>
              );
            })
          ) : (
            <LinearGradient
              id="fillShadowGradient"
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset="0"
                stopColor={fillShadowGradient}
                stopOpacity={fillShadowGradientOpacity}
              />
              <Stop offset="1" stopColor={fillShadowGradient} stopOpacity="0" />
            </LinearGradient>
          )}
        </Defs>
      );
    };
    return _this;
  }
  AbstractChart.prototype.getPropsForBackgroundLines = function() {
    var _a = this.props.chartConfig.propsForBackgroundLines,
      propsForBackgroundLines = _a === void 0 ? {} : _a;
    return __assign(
      {
        stroke: this.props.chartConfig.color(0.2),
        strokeDasharray: "5, 10",
        strokeWidth: 1
      },
      propsForBackgroundLines
    );
  };
  AbstractChart.prototype.getPropsForLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForLabels,
      propsForLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fontSize: 12, fill: labelColor(0.8) }, propsForLabels);
  };
  AbstractChart.prototype.getPropsForVerticalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForVerticalLabels,
      propsForVerticalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForVerticalLabels);
  };
  AbstractChart.prototype.getPropsForHorizontalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForHorizontalLabels,
      propsForHorizontalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForHorizontalLabels);
  };
  return AbstractChart;
})(Component);
export default AbstractChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osY0FBYyxFQUNkLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNOLE1BQU0sa0JBQWtCLENBQUM7QUFvQzFCLE1BQU0sQ0FBQyxJQUFNLGtDQUFrQyxHQUFHLElBQUksQ0FBQztBQUV2RDtJQUdVLGlDQUFtRTtJQUg3RTtRQUFBLHFFQW1jQztRQS9iQyxnQkFBVSxHQUFHLFVBQUMsSUFBYztZQUMxQixJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUN2QixPQUFPLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxpQkFBUSxJQUFJLEdBQUUsQ0FBQyxNQUFJLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxpQkFBUSxJQUFJLEdBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FDTCxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxNQUNyQyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxDQUNoRCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksRUFBUSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLEVBQVEsSUFBSSxDQUFDLElB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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgRGVmcyxcclxuICBMaW5lLFxyXG4gIExpbmVhckdyYWRpZW50LFxyXG4gIFN0b3AsXHJcbiAgVGV4dCxcclxuICBUU3BhblxyXG59IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XHJcblxyXG5pbXBvcnQgeyBDaGFydENvbmZpZywgRGF0YXNldCwgUGFydGlhbEJ5IH0gZnJvbSBcIi4vSGVscGVyVHlwZXNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RDaGFydFByb3BzIHtcclxuICBmcm9tWmVybz86IGJvb2xlYW47XHJcbiAgZnJvbU51bWJlcj86IG51bWJlcjtcclxuICBjaGFydENvbmZpZz86IEFic3RyYWN0Q2hhcnRDb25maWc7XHJcbiAgeUF4aXNMYWJlbD86IHN0cmluZztcclxuICB5QXhpc1N1ZmZpeD86IHN0cmluZztcclxuICB5TGFiZWxzT2Zmc2V0PzogbnVtYmVyO1xyXG4gIHlBeGlzSW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgeEF4aXNMYWJlbD86IHN0cmluZztcclxuICB4TGFiZWxzT2Zmc2V0PzogbnVtYmVyO1xyXG4gIGhpZGVQb2ludHNBdEluZGV4PzogbnVtYmVyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RDaGFydENvbmZpZyBleHRlbmRzIENoYXJ0Q29uZmlnIHtcclxuICBjb3VudD86IG51bWJlcjtcclxuICBkYXRhPzogRGF0YXNldFtdO1xyXG4gIHdpZHRoPzogbnVtYmVyO1xyXG4gIGhlaWdodD86IG51bWJlcjtcclxuICBwYWRkaW5nVG9wPzogbnVtYmVyO1xyXG4gIHBhZGRpbmdSaWdodD86IG51bWJlcjtcclxuICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICBmb3JtYXRZTGFiZWw/OiAoeUxhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBsYWJlbHM/OiBzdHJpbmdbXTtcclxuICBob3Jpem9udGFsT2Zmc2V0PzogbnVtYmVyO1xyXG4gIHN0YWNrZWRCYXI/OiBib29sZWFuO1xyXG4gIHZlcnRpY2FsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICBmb3JtYXRYTGFiZWw/OiAoeExhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcclxuICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEFic3RyYWN0Q2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0UgPSAwLjc1O1xyXG5cclxuY2xhc3MgQWJzdHJhY3RDaGFydDxcclxuICBJUHJvcHMgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0UHJvcHMsXHJcbiAgSVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RDaGFydFN0YXRlXHJcbj4gZXh0ZW5kcyBDb21wb25lbnQ8QWJzdHJhY3RDaGFydFByb3BzICYgSVByb3BzLCBBYnN0cmFjdENoYXJ0U3RhdGUgJiBJU3RhdGU+IHtcclxuICBjYWxjU2NhbGVyID0gKGRhdGE6IG51bWJlcltdKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5mcm9tWmVybykge1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoLi4uZGF0YSwgMCkgLSBNYXRoLm1pbiguLi5kYXRhLCAwKSB8fCAxO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmZyb21OdW1iZXIpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBNYXRoLm1heCguLi5kYXRhLCB0aGlzLnByb3BzLmZyb21OdW1iZXIpIC1cclxuICAgICAgICAgIE1hdGgubWluKC4uLmRhdGEsIHRoaXMucHJvcHMuZnJvbU51bWJlcikgfHwgMVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmRhdGEpIC0gTWF0aC5taW4oLi4uZGF0YSkgfHwgMTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjYWxjQmFzZUhlaWdodCA9IChkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmRhdGEpO1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZGF0YSk7XHJcbiAgICBpZiAobWluID49IDAgJiYgbWF4ID49IDApIHtcclxuICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPiAwKSB7XHJcbiAgICAgIHJldHVybiAoaGVpZ2h0ICogbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjYWxjSGVpZ2h0ID0gKHZhbDogbnVtYmVyLCBkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLmRhdGEpO1xyXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uZGF0YSk7XHJcblxyXG4gICAgaWYgKG1pbiA8IDAgJiYgbWF4ID4gMCkge1xyXG4gICAgICByZXR1cm4gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA+PSAwICYmIG1heCA+PSAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZyb21aZXJvXHJcbiAgICAgICAgPyBoZWlnaHQgKiAodmFsIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKVxyXG4gICAgICAgIDogaGVpZ2h0ICogKCh2YWwgLSBtaW4pIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKTtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mcm9tWmVyb1xyXG4gICAgICAgID8gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSlcclxuICAgICAgICA6IGhlaWdodCAqICgodmFsIC0gbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKSB7XHJcbiAgICBjb25zdCB7IHByb3BzRm9yQmFja2dyb3VuZExpbmVzID0ge30gfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdHJva2U6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMC4yKSxcclxuICAgICAgc3Ryb2tlRGFzaGFycmF5OiBcIjUsIDEwXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICAuLi5wcm9wc0ZvckJhY2tncm91bmRMaW5lc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFByb3BzRm9yTGFiZWxzKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwcm9wc0ZvckxhYmVscyA9IHt9LFxyXG4gICAgICBjb2xvcixcclxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXHJcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgZmlsbDogbGFiZWxDb2xvcigwLjgpLFxyXG4gICAgICAuLi5wcm9wc0ZvckxhYmVsc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFByb3BzRm9yVmVydGljYWxMYWJlbHMoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHByb3BzRm9yVmVydGljYWxMYWJlbHMgPSB7fSxcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxyXG4gICAgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmaWxsOiBsYWJlbENvbG9yKDAuOCksXHJcbiAgICAgIC4uLnByb3BzRm9yVmVydGljYWxMYWJlbHNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRQcm9wc0Zvckhvcml6b250YWxMYWJlbHMoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHByb3BzRm9ySG9yaXpvbnRhbExhYmVscyA9IHt9LFxyXG4gICAgICBjb2xvcixcclxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXHJcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpbGw6IGxhYmVsQ29sb3IoMC44KSxcclxuICAgICAgLi4ucHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVySG9yaXpvbnRhbExpbmVzID0gY29uZmlnID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY291bnQsXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gICAgfSA9IGNvbmZpZztcclxuICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZTtcclxuXHJcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheShjb3VudCArIDEpXS5tYXAoKF8sIGkpID0+IHtcclxuICAgICAgY29uc3QgeSA9IChiYXNlUG9zaXRpb24gLyBjb3VudCkgKiBpICsgcGFkZGluZ1RvcDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8TGluZVxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeDE9e3BhZGRpbmdSaWdodH1cclxuICAgICAgICAgIHkxPXt5fVxyXG4gICAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgICAgeTI9e3l9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJIb3Jpem9udGFsTGluZSA9IGNvbmZpZyA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gICAgfSA9IGNvbmZpZztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxMaW5lXHJcbiAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgIHgxPXtwYWRkaW5nUmlnaHR9XHJcbiAgICAgICAgeTE9e2hlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArIHBhZGRpbmdUb3B9XHJcbiAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckhvcml6b250YWxMYWJlbHMgPSAoXHJcbiAgICBjb25maWc6IE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+ICYgeyBkYXRhOiBudW1iZXJbXSB9XHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvdW50LFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgICBkZWNpbWFsUGxhY2VzID0gMixcclxuICAgICAgZm9ybWF0WUxhYmVsID0gKHlMYWJlbDogc3RyaW5nKSA9PiB5TGFiZWwsXHJcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxuICAgIH0gPSBjb25maWc7XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICB5QXhpc0xhYmVsID0gXCJcIixcclxuICAgICAgeUF4aXNTdWZmaXggPSBcIlwiLFxyXG4gICAgICB5TGFiZWxzT2Zmc2V0ID0gMTJcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIG5ldyBBcnJheShjb3VudCA9PT0gMSA/IDEgOiBjb3VudCArIDEpLmZpbGwoMSkubWFwKChfLCBpKSA9PiB7XHJcbiAgICAgIGxldCB5TGFiZWwgPSBTdHJpbmcoaSAqIGNvdW50KTtcclxuXHJcbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXHJcbiAgICAgICAgICBkYXRhWzBdLnRvRml4ZWQoZGVjaW1hbFBsYWNlcylcclxuICAgICAgICApfSR7eUF4aXNTdWZmaXh9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICAgID8gKHRoaXMuY2FsY1NjYWxlcihkYXRhKSAvIGNvdW50KSAqIGkgKyBNYXRoLm1pbiguLi5kYXRhLCAwKVxyXG4gICAgICAgICAgOiAodGhpcy5jYWxjU2NhbGVyKGRhdGEpIC8gY291bnQpICogaSArIE1hdGgubWluKC4uLmRhdGEpO1xyXG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXHJcbiAgICAgICAgICBsYWJlbC50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpXHJcbiAgICAgICAgKX0ke3lBeGlzU3VmZml4fWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZTtcclxuICAgICAgY29uc3QgeCA9IHBhZGRpbmdSaWdodCAtIHlMYWJlbHNPZmZzZXQ7XHJcbiAgICAgIGNvbnN0IHkgPVxyXG4gICAgICAgIGNvdW50ID09PSAxICYmIHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICAgID8gcGFkZGluZ1RvcCArIDRcclxuICAgICAgICAgIDogaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlIC1cclxuICAgICAgICAgICAgKGJhc2VQb3NpdGlvbiAvIGNvdW50KSAqIGkgK1xyXG4gICAgICAgICAgICBwYWRkaW5nVG9wO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0XHJcbiAgICAgICAgICByb3RhdGlvbj17aG9yaXpvbnRhbExhYmVsUm90YXRpb259XHJcbiAgICAgICAgICBvcmlnaW49e2Ake3h9LCAke3l9YH1cclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIHg9e3h9XHJcbiAgICAgICAgICB0ZXh0QW5jaG9yPVwiZW5kXCJcclxuICAgICAgICAgIHk9e3l9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxyXG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzKCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3lMYWJlbH1cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJWZXJ0aWNhbExhYmVscyA9ICh7XHJcbiAgICBsYWJlbHMgPSBbXSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIGhvcml6b250YWxPZmZzZXQgPSAwLFxyXG4gICAgc3RhY2tlZEJhciA9IGZhbHNlLFxyXG4gICAgdmVydGljYWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgIGZvcm1hdFhMYWJlbCA9IHhMYWJlbCA9PiB4TGFiZWwsXHJcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICB8IFwibGFiZWxzXCJcclxuICAgIHwgXCJ3aWR0aFwiXHJcbiAgICB8IFwiaGVpZ2h0XCJcclxuICAgIHwgXCJwYWRkaW5nUmlnaHRcIlxyXG4gICAgfCBcInBhZGRpbmdUb3BcIlxyXG4gICAgfCBcImhvcml6b250YWxPZmZzZXRcIlxyXG4gICAgfCBcInN0YWNrZWRCYXJcIlxyXG4gICAgfCBcInZlcnRpY2FsTGFiZWxSb3RhdGlvblwiXHJcbiAgICB8IFwiZm9ybWF0WExhYmVsXCJcclxuICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxyXG4gID4pID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgeEF4aXNMYWJlbCA9IFwiXCIsXHJcbiAgICAgIHhMYWJlbHNPZmZzZXQgPSAwLFxyXG4gICAgICBoaWRlUG9pbnRzQXRJbmRleCA9IFtdXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCBmb250U2l6ZSA9IDEyO1xyXG5cclxuICAgIGxldCBmYWMgPSAxO1xyXG4gICAgaWYgKHN0YWNrZWRCYXIpIHtcclxuICAgICAgZmFjID0gMC43MTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWxzLm1hcCgobGFiZWwsIGkpID0+IHtcclxuICAgICAgaWYgKGhpZGVQb2ludHNBdEluZGV4LmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHggPVxyXG4gICAgICAgICgoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIGxhYmVscy5sZW5ndGgpICogaSArXHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgaG9yaXpvbnRhbE9mZnNldCkgKlxyXG4gICAgICAgIGZhYztcclxuXHJcbiAgICAgIGNvbnN0IHkgPVxyXG4gICAgICAgIGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArXHJcbiAgICAgICAgcGFkZGluZ1RvcCArXHJcbiAgICAgICAgZm9udFNpemUgKiAyICtcclxuICAgICAgICB4TGFiZWxzT2Zmc2V0O1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dCBrZXk9e01hdGgucmFuZG9tKCl9PlxyXG4gICAgICAgICAgPFRTcGFuXHJcbiAgICAgICAgICAgIG9yaWdpbj17YCR7eH0sICR7eX1gfVxyXG4gICAgICAgICAgICByb3RhdGlvbj17dmVydGljYWxMYWJlbFJvdGF0aW9ufVxyXG4gICAgICAgICAgICB4PXt4fVxyXG4gICAgICAgICAgICB5PXt5fVxyXG4gICAgICAgICAgICB0ZXh0QW5jaG9yPXt2ZXJ0aWNhbExhYmVsUm90YXRpb24gPT09IDAgPyBcIm1pZGRsZVwiIDogXCJzdGFydFwifVxyXG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxyXG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvclZlcnRpY2FsTGFiZWxzKCl9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtgJHtmb3JtYXRYTGFiZWwobGFiZWwpfSR7eEF4aXNMYWJlbH1gfVxyXG4gICAgICAgICAgPC9UU3Bhbj5cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJWZXJ0aWNhbExpbmVzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgfTogT21pdDxcclxuICAgIFBpY2s8XHJcbiAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICAgIHwgXCJkYXRhXCJcclxuICAgICAgfCBcIndpZHRoXCJcclxuICAgICAgfCBcImhlaWdodFwiXHJcbiAgICAgIHwgXCJwYWRkaW5nUmlnaHRcIlxyXG4gICAgICB8IFwicGFkZGluZ1RvcFwiXHJcbiAgICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxyXG4gICAgPixcclxuICAgIFwiZGF0YVwiXHJcbiAgPiAmIHsgZGF0YTogbnVtYmVyW10gfSkgPT4ge1xyXG4gICAgY29uc3QgeyB5QXhpc0ludGVydmFsID0gMSB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheShNYXRoLmNlaWwoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSldLm1hcChcclxuICAgICAgKF8sIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPExpbmVcclxuICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICB4MT17TWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKSAqIGkgK1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHkxPXswfVxyXG4gICAgICAgICAgICB4Mj17TWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKSAqIGkgK1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclZlcnRpY2FsTGluZSA9ICh7XHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gIH06IFBpY2s8XHJcbiAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIiB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcclxuICA+KSA9PiAoXHJcbiAgICA8TGluZVxyXG4gICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgIHgxPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XHJcbiAgICAgIHkxPXswfVxyXG4gICAgICB4Mj17TWF0aC5mbG9vcihwYWRkaW5nUmlnaHQpfVxyXG4gICAgICB5Mj17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cclxuICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cclxuICAgIC8+XHJcbiAgKTtcclxuXHJcbiAgcmVuZGVyRGVmcyA9IChcclxuICAgIGNvbmZpZzogUGljazxcclxuICAgICAgUGFydGlhbEJ5PFxyXG4gICAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5XCJcclxuICAgICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVwiXHJcbiAgICAgID4sXHJcbiAgICAgIHwgXCJ3aWR0aFwiXHJcbiAgICAgIHwgXCJoZWlnaHRcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbVwiXHJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb1wiXHJcbiAgICAgIHwgXCJ1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0XCJcclxuICAgICAgfCBcImRhdGFcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XCJcclxuICAgID5cclxuICApID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50RnJvbSxcclxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50VG8sXHJcbiAgICAgIHVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXQsXHJcbiAgICAgIGRhdGFcclxuICAgIH0gPSBjb25maWc7XHJcblxyXG4gICAgY29uc3QgZnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiKVxyXG4gICAgICA/IGNvbmZpZy5iYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVxyXG4gICAgICA6IDEuMDtcclxuICAgIGNvbnN0IHRvT3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiKVxyXG4gICAgICA/IGNvbmZpZy5iYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcclxuICAgICAgOiAxLjA7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50ID0gY29uZmlnLmhhc093blByb3BlcnR5KFwiZmlsbFNoYWRvd0dyYWRpZW50XCIpXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudFxyXG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcclxuXHJcbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxyXG4gICAgKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XHJcbiAgICAgIDogMC4xO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxEZWZzPlxyXG4gICAgICAgIDxMaW5lYXJHcmFkaWVudFxyXG4gICAgICAgICAgaWQ9XCJiYWNrZ3JvdW5kR3JhZGllbnRcIlxyXG4gICAgICAgICAgeDE9ezB9XHJcbiAgICAgICAgICB5MT17aGVpZ2h0fVxyXG4gICAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgICAgeTI9ezB9XHJcbiAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgIG9mZnNldD1cIjBcIlxyXG4gICAgICAgICAgICBzdG9wQ29sb3I9e2JhY2tncm91bmRHcmFkaWVudEZyb219XHJcbiAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmcm9tT3BhY2l0eX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICBvZmZzZXQ9XCIxXCJcclxuICAgICAgICAgICAgc3RvcENvbG9yPXtiYWNrZ3JvdW5kR3JhZGllbnRUb31cclxuICAgICAgICAgICAgc3RvcE9wYWNpdHk9e3RvT3BhY2l0eX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cclxuICAgICAgICB7dXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldCA/IChcclxuICAgICAgICAgIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8TGluZWFyR3JhZGllbnRcclxuICAgICAgICAgICAgICBpZD17YGZpbGxTaGFkb3dHcmFkaWVudF8ke2luZGV4fWB9XHJcbiAgICAgICAgICAgICAga2V5PXtgJHtpbmRleH1gfVxyXG4gICAgICAgICAgICAgIHgxPXswfVxyXG4gICAgICAgICAgICAgIHkxPXswfVxyXG4gICAgICAgICAgICAgIHgyPXswfVxyXG4gICAgICAgICAgICAgIHkyPXtoZWlnaHR9XHJcbiAgICAgICAgICAgICAgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ9XCIwXCJcclxuICAgICAgICAgICAgICAgIHN0b3BDb2xvcj17XHJcbiAgICAgICAgICAgICAgICAgIGRhdGFzZXQuY29sb3IgPyBkYXRhc2V0LmNvbG9yKDEuMCkgOiBmaWxsU2hhZG93R3JhZGllbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPFN0b3BcclxuICAgICAgICAgICAgICAgIG9mZnNldD1cIjFcIlxyXG4gICAgICAgICAgICAgICAgc3RvcENvbG9yPXtcclxuICAgICAgICAgICAgICAgICAgZGF0YXNldC5jb2xvclxyXG4gICAgICAgICAgICAgICAgICAgID8gZGF0YXNldC5jb2xvcihmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5KVxyXG4gICAgICAgICAgICAgICAgICAgIDogZmlsbFNoYWRvd0dyYWRpZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdG9wT3BhY2l0eT1cIjBcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvTGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAgICApKVxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8TGluZWFyR3JhZGllbnRcclxuICAgICAgICAgICAgaWQ9XCJmaWxsU2hhZG93R3JhZGllbnRcIlxyXG4gICAgICAgICAgICB4MT17MH1cclxuICAgICAgICAgICAgeTE9ezB9XHJcbiAgICAgICAgICAgIHgyPXswfVxyXG4gICAgICAgICAgICB5Mj17aGVpZ2h0fVxyXG4gICAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICAgIG9mZnNldD1cIjBcIlxyXG4gICAgICAgICAgICAgIHN0b3BDb2xvcj17ZmlsbFNoYWRvd0dyYWRpZW50fVxyXG4gICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8U3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtmaWxsU2hhZG93R3JhZGllbnR9IHN0b3BPcGFjaXR5PVwiMFwiIC8+XHJcbiAgICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvRGVmcz5cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RDaGFydDtcclxuIl19
