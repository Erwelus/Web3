package Ervelus.dao;

import javax.faces.context.FacesContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

public class SessionControl {
    private final String COOKIE_NAME = "session_id";
    private String session_id;

    public SessionControl(){
        if(getSession_id()==null){
            session_id = UUID.randomUUID().toString();
        }else session_id = getSession_id();
    }

    public String getSession_id() {
        HttpServletRequest request = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest();

        Cookie[] cookies = request.getCookies();
        if(cookies!=null) {
            for (Cookie c : cookies) {
                if (c.getName().equals(COOKIE_NAME)) return c.getValue();
            }
        }
        return null;
    }

    public void setSession(){
        HttpServletResponse response = (HttpServletResponse) FacesContext.getCurrentInstance().getExternalContext().getResponse();
        Cookie sessionId = new Cookie(COOKIE_NAME, session_id);
        response.addCookie(sessionId);
    }

}
