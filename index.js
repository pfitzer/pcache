/**
 * @author Michael Pfister <michael@mp-development.de>
 * @copyright (c) 2014, Michael Pfister
 * @license BSD
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function now() { return (new Date).getTime(); }

var pcache = function(t) {
    this.t = t * 1000;
    this.storage = {};
}

pcache.prototype.set = function(k, v) {
    var e = this.t + now();
    this.storage[k]= { value: v, expire: e };
}

pcache.prototype.get = function(k) {
    var v = this.storage[k].value;

    if (this.storage[k].expire >= now()) {
        return v;
    }
    this.del(k);

    return null;
}

pcache.prototype.del = function(k) {
    delete this.storage[k];
}

pcache.prototype.clearAll = function() {
    this.storage = {};
}

pcache.prototype.keys = function() {
    return Object.keys(this.storage);
};

if (typeof exports !== "undefined") {
    module.exports = pcache;
}
