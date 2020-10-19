package Ervelus.model;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

public class Entry {
    private Double x;
    private Double y;
    private Double r;
    private boolean res;
    private String session_id;

    public void setR(Double r) {
        this.r = r;
    }
    public void setRes(boolean res) {
        this.res = res;
    }
    public void setX(Double x) {
        this.x = x;
    }
    public void setY(Double y) {
        this.y = y;
    }
    public Double getR() {
        return r;
    }
    public Double getX() {
        return x;
    }
    public boolean isRes() {
        return res;
    }
    public Double getY() {
        return y;
    }
    public String getSession_id() {
        return session_id;
    }
    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public void check(){
        if(x>=0 && y<=0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2))){
            res = true;
        }else if(x<=0 && y<=0 && y>=-x-r){
            res = true;
        }else res = x <= 0 && y >= 0 && y <= r && x >= -r / 2;
    }
}
